import { useMemo, useState } from 'react'
import {
  DEFAULT_EXPANDED_IDS,
  LEAF_CATEGORIES,
  filterEquipmentTree,
} from '@/data/equipment.js'
import {
  getEquipmentTree,
} from '@/stores/equipmentStore.js'

// Right-hand equipment picker: the Equipment Structure tree with a checkbox on
// every node. Checking a branch checks everything beneath it; a branch shows a
// dash when only some of its descendants are checked.
export default function EquipmentTreePanel({ title = 'Equipment Structure', onClose, onApply }) {
  const tree = useMemo(() => getEquipmentTree(), [])
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState({})
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(DEFAULT_EXPANDED_IDS.map((id) => [id, true])),
  )

  const visibleTree = filterEquipmentTree(tree, query) ?? { ...tree, children: [] }
  const checkedIds = Object.keys(checked).filter((id) => checked[id])

  function toggleNode(node) {
    const ids = collectIds(node)
    const nextValue = !isFullyChecked(node, checked)
    setChecked((current) => {
      const next = { ...current }
      ids.forEach((id) => {
        next[id] = nextValue
      })
      return next
    })
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col border-l border-[#dce8ef] bg-white">
      <div className="flex shrink-0 items-center gap-[10px] border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[14px] py-[12px]">
        <span className="min-w-0 flex-1 truncate font-heading text-[15px] font-bold text-ns-navy">{title}</span>
        <button
          type="button"
          aria-label="Close equipment tree"
          onClick={onClose}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[16px] text-[#5e7894] transition hover:bg-[#e8f1f8] focus:outline-none"
        >
          ×
        </button>
      </div>

      <div className="shrink-0 px-[14px] py-[10px]">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search equipment"
          className="h-[34px] w-full rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy outline-none placeholder:text-[#9db0c2] focus:border-ns-blue"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-[10px] pb-[8px]">
        <CheckTreeNode
          autoExpand={query.trim().length > 0}
          checked={checked}
          depth={0}
          expanded={expanded}
          node={visibleTree}
          onToggle={toggleNode}
          setExpanded={setExpanded}
        />
      </div>

      <div className="flex shrink-0 items-center gap-[10px] border-t border-[#e4edf3] bg-[#f9fcfe] px-[14px] py-[10px]">
        <span className="min-w-0 flex-1 truncate text-[12px] text-[#6d89a2]">
          {checkedIds.length} selected
        </span>
        <button
          type="button"
          onClick={() => setChecked({})}
          className="rounded-full border border-[#d7e5ed] bg-white px-[14px] py-[6px] text-[12px] font-semibold text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => onApply?.(collectSelection(visibleTree, checked))}
          className="rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[16px] py-[6px] text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.2)] transition hover:brightness-110 focus:outline-none"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

function CheckTreeNode({ autoExpand, checked, depth, expanded, node, onToggle, setExpanded }) {
  const hasChildren = node.children.length > 0
  const isOpen = autoExpand || expanded[node.id]
  const full = isFullyChecked(node, checked)
  const partial = !full && hasCheckedDescendant(node, checked)

  return (
    <div>
      <div
        className="flex min-h-[26px] items-center gap-[6px] rounded-sm px-[4px] hover:bg-[#f0f8fe]"
        style={{ paddingLeft: `${depth * 14}px` }}
      >
        <button
          type="button"
          aria-label={hasChildren ? `Toggle ${node.label}` : undefined}
          disabled={!hasChildren}
          onClick={() => {
            if (!hasChildren || autoExpand) {
              return
            }

            setExpanded((current) => ({ ...current, [node.id]: !current[node.id] }))
          }}
          className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center border ${
            hasChildren ? 'border-ns-tree-text bg-white' : 'border-transparent'
          }`}
        >
          {hasChildren ? (
            <svg viewBox="0 0 10 10" className="h-[9px] w-[9px] stroke-ns-tree-text" strokeWidth="1.2">
              <line x1="2" y1="5" x2="8" y2="5" />
              {!isOpen && <line x1="5" y1="2" x2="5" y2="8" />}
            </svg>
          ) : null}
        </button>

        <label className="flex min-w-0 flex-1 items-center gap-[7px]">
          <input
            type="checkbox"
            checked={full}
            ref={(element) => {
              if (element) {
                element.indeterminate = partial
              }
            }}
            onChange={() => onToggle(node)}
            className="h-[14px] w-[14px] shrink-0 accent-ns-blue"
          />
          <span
            className={`truncate text-left text-[14px] leading-[20px] ${
              node.level === 0 ? 'bg-[#d7e7f3] px-[3px] text-ns-navy' : 'text-ns-tree-text'
            } ${node.level > 0 && node.level < 4 ? 'font-semibold' : ''}`}
          >
            {node.label}
          </span>
        </label>
      </div>

      {hasChildren && isOpen ? (
        <div className="ml-[6px] border-l border-dotted border-ns-tree-line">
          {node.children.map((child) => (
            <CheckTreeNode
              key={child.id}
              autoExpand={autoExpand}
              checked={checked}
              depth={depth + 1}
              expanded={expanded}
              node={child}
              onToggle={onToggle}
              setExpanded={setExpanded}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

// Top-most checked nodes (a checked node whose parent is also checked is just
// part of that branch), each with its path from the vessel down. `equipmentLabel`
// is the deepest ancestor that is real equipment, so a spare part reports the
// component it belongs to.
function collectSelection(node, checked, trail = [], out = []) {
  const path = node.level === 0 ? trail : [...trail, { label: node.label, category: node.category }]

  if (checked[node.id]) {
    const equipment = [...path].reverse().find((entry) => !LEAF_CATEGORIES.includes(entry.category))
    out.push({
      id: node.id,
      label: node.label,
      category: node.category,
      path: path.map((entry) => entry.label),
      equipmentLabel: equipment?.label ?? node.label,
      equipmentCategory: equipment?.category ?? node.category,
    })
    return out
  }

  node.children.forEach((child) => collectSelection(child, checked, path, out))
  return out
}

function collectIds(node, ids = []) {
  ids.push(node.id)
  node.children.forEach((child) => collectIds(child, ids))
  return ids
}

function isFullyChecked(node, checked) {
  return collectIds(node).every((id) => checked[id])
}

function hasCheckedDescendant(node, checked) {
  return collectIds(node).some((id) => checked[id])
}
