// Persistence for the Equipment Structure. Kept out of `data/equipment.js` so
// that module stays pure data plus pure tree helpers — the seeders import it
// directly under Node, where the `@` alias does not exist.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'
import { userQuery } from '@/services/api/session.js'
import {
  EQUIPMENT_TREE,
  applyEquipmentAdditions,
  equipmentNodeId,
} from '@/data/equipment.js'

// The live hierarchy, loaded from the `equipment_nodes` table. It already
// contains everything the user has added, so no additions replay is needed on
// top of it. EQUIPMENT_TREE stays as the bundled seed the app falls back to
// when the database is unreachable.
const TREE_KEY = 'ns5-equipment-tree'

// Bumped to v2 to drop the scratch nodes ("mo", "qwef", "hello", ...) left in
// browsers by earlier "Add to hierarchy" testing; the stale v1 entry is
// deleted on first load so the tree starts from the seed hierarchy again.
const ADDITIONS_KEY = 'ns5-equipment-additions-v2'
const LEGACY_ADDITIONS_KEY = 'ns5-equipment-additions'

// Both are per-account, so neither is cached in localStorage — see createStore.
const treeStore = createStore(TREE_KEY, null, { persist: false })
const additionsStore = createStore(ADDITIONS_KEY, [], { persist: false })

function purgeLegacyAdditions() {
  try {
    // TREE_KEY and ADDITIONS_KEY were persisted before these stores became
    // per-account; drop anything an earlier build left behind.
    for (const key of [LEGACY_ADDITIONS_KEY, TREE_KEY, ADDITIONS_KEY]) {
      window.localStorage.removeItem(key)
    }
  } catch {
    // ignore (e.g. private browsing)
  }
}

export async function hydrateEquipmentTree() {
  return treeStore.hydrate(await api.get(`/equipment/tree${userQuery()}`))
}

// The tree every window should render. Falls back to the bundled hierarchy
// with locally cached additions layered on when the database has not answered.
export function getEquipmentTree() {
  const tree = treeStore.get()
  if (tree && tree.id) return tree
  return applyEquipmentAdditions(EQUIPMENT_TREE, loadEquipmentAdditions())
}

// Keeps the cached tree in step with a node added in this session, so a
// re-render before the next reload still shows it.
export function cacheEquipmentTree(tree) {
  if (tree && tree.id) treeStore.hydrate(tree)
}

export async function hydrateEquipmentAdditions() {
  purgeLegacyAdditions()
  return additionsStore.hydrate(await api.get(`/equipment/additions${userQuery()}`))
}

export function loadEquipmentAdditions() {
  purgeLegacyAdditions()
  const rows = additionsStore.get()
  return Array.isArray(rows) ? rows : []
}

// Writes the additions that are new since the last save, each under the id the
// tree helpers would give it, so the ids in MySQL match the ids the windows
// already hold.
export function saveEquipmentAdditions(additions) {
  const next = Array.isArray(additions) ? additions : []
  const known = new Set(
    loadEquipmentAdditions().map((item) => `${item.parentId}/${item.draft?.label}`),
  )
  const added = next.filter((item) => !known.has(`${item.parentId}/${item.draft?.label}`))

  additionsStore.set(next, () =>
    Promise.all(
      added.map((item) =>
        api.post('/equipment/nodes', {
          id: equipmentNodeId(item.parentId, item.draft.label),
          parentId: item.parentId,
          label: item.draft.label,
          category: item.draft.category,
          partNo: item.draft.partNo ?? '',
          makerRemarks: item.draft.makerRemarks ?? '',
        }),
      ),
    ),
  )
  return true
}
