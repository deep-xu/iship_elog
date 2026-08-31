import { useEffect, useMemo, useState } from 'react'
import {
  HIERARCHY_RULES,
  ancestorChainFor,
  childrenOfCategory,
  findEquipmentNodeById,
  validateEquipmentDraft,
} from '../data/equipment.js'

const TYPE_OPTIONS = HIERARCHY_RULES.map((rule) => rule.category)

// Maps a chosen category to the tree node its parent chain starts from.
function resolveChain(tree, vesselId, chainCategories, picks) {
  // Walk down from the vessel, one category at a time, collecting the options
  // available at each step given what has been picked above it.
  const steps = []
  let current = findEquipmentNodeById(tree, vesselId)

  for (const category of chainCategories) {
    const options = childrenOfCategory(current, category)
    const pickedId = picks[category] ?? ''
    const picked = options.find((option) => option.id === pickedId) ?? null
    steps.push({ category, options, pickedId: picked ? pickedId : '', disabled: !current })
    current = picked
  }

  return { steps, parent: current }
}

export default function AddEquipmentDialog({ tree, selectedNode, onCancel, onAdd }) {
  const vessels = tree.children
  const [vesselId, setVesselId] = useState(() => defaultVesselId(tree, selectedNode))
  const [category, setCategory] = useState(() => defaultCategory(selectedNode))
  const [picks, setPicks] = useState(() => defaultPicks(tree, selectedNode))
  const [label, setLabel] = useState('')
  const [partNo, setPartNo] = useState('')
  const [makerRemarks, setMakerRemarks] = useState('')
  const [error, setError] = useState('')

  const chainCategories = useMemo(() => ancestorChainFor(category), [category])
  const { steps, parent } = useMemo(
    () => resolveChain(tree, vesselId, chainCategories, picks),
    [tree, vesselId, chainCategories, picks],
  )

  // Parent for a Major System is the vessel itself.
  const parentNode = chainCategories.length === 0 ? findEquipmentNodeById(tree, vesselId) : parent
  const isPart = category === 'Spare Part'

  useEffect(() => {
    setError('')
  }, [category, vesselId, picks, label, partNo])

  function handlePick(stepCategory, value) {
    setPicks((current) => {
      const next = { ...current, [stepCategory]: value }
      // Clear every level below the one that just changed.
      const index = chainCategories.indexOf(stepCategory)
      chainCategories.slice(index + 1).forEach((deeper) => {
        delete next[deeper]
      })
      return next
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!parentNode) {
      setError(`Choose the ${chainCategories[steps.findIndex((s) => !s.pickedId)] ?? 'parent'} it belongs to.`)
      return
    }

    const draft = {
      label: label.trim(),
      category,
      partNo: isPart ? partNo.trim() : '',
      makerRemarks: isPart ? makerRemarks.trim() : '',
    }

    const problem = validateEquipmentDraft(tree, parentNode.id, draft)
    if (problem) {
      setError(problem)
      return
    }

    onAdd(parentNode.id, draft)
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#16304f]/28 p-[24px] backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-full w-[560px] flex-col overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_30px_70px_rgba(23,50,77,0.26)]"
      >
        <div className="shrink-0 border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[22px] py-[18px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#88a2bb]">
            Equipment Structure
          </div>
          <div className="mt-[4px] text-[18px] font-bold text-ns-navy">Add to hierarchy</div>
        </div>

        <div className="min-h-0 flex-1 space-y-[14px] overflow-auto px-[22px] py-[18px]">
          <Row label="Add">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={selectClass}
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Row>

          <Row label="Vessel">
            <select
              value={vesselId}
              onChange={(event) => {
                setVesselId(event.target.value)
                setPicks({})
              }}
              className={selectClass}
            >
              {vessels.map((vessel) => (
                <option key={vessel.id} value={vessel.id}>
                  {vessel.label}
                </option>
              ))}
            </select>
          </Row>

          {steps.map((step, index) => {
            const previousPicked = index === 0 || Boolean(steps[index - 1].pickedId)
            return (
              <Row key={step.category} label={step.category}>
                <select
                  value={step.pickedId}
                  disabled={!previousPicked || step.options.length === 0}
                  onChange={(event) => handlePick(step.category, event.target.value)}
                  className={`${selectClass} disabled:cursor-not-allowed disabled:bg-[#f2f7fa] disabled:text-[#a9bccd]`}
                >
                  <option value="">
                    {!previousPicked
                      ? `Choose a ${steps[index - 1].category} first`
                      : step.options.length === 0
                        ? `No ${step.category} available`
                        : `-- Select ${step.category} --`}
                  </option>
                  {step.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Row>
            )
          })}

          <div className="!mt-[18px] border-t border-[#e4edf3] pt-[16px]">
            <Row label="Name">
              <input
                autoFocus
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder={`New ${category.toLowerCase()} name`}
                className={inputClass}
              />
            </Row>
          </div>

          {isPart ? (
            <>
              <Row label="Part No.">
                <input
                  value={partNo}
                  onChange={(event) => setPartNo(event.target.value)}
                  placeholder="e.g. GEN-ME-FI-009"
                  className={inputClass}
                />
              </Row>
              <Row label="Maker">
                <input
                  value={makerRemarks}
                  onChange={(event) => setMakerRemarks(event.target.value)}
                  placeholder="Maker / remarks"
                  className={inputClass}
                />
              </Row>
            </>
          ) : null}

          <div className="!mt-[16px] rounded-[14px] bg-[#f4f9fc] px-[14px] py-[12px] text-[12px] text-[#5b7690]">
            {parentNode ? (
              <>
                Will be added under <span className="font-semibold text-ns-navy">{parentNode.label}</span>
              </>
            ) : (
              'Choose each level above to pick where this belongs.'
            )}
          </div>

          {error ? (
            <p
              role="alert"
              className="!mt-[12px] rounded-[12px] border border-[#e9b3c1] bg-[#fdf6f8] px-[14px] py-[10px] text-[13px] font-semibold text-[#b14d4d]"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-[10px] border-t border-[#e4edf3] bg-[#fcfeff] px-[22px] py-[16px]">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#d7e5ed] bg-white px-[16px] py-[9px] text-[13px] font-semibold text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[18px] py-[9px] text-[13px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] transition focus:outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

const selectClass =
  'h-[38px] w-full rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy focus:outline-none'
const inputClass =
  'h-[38px] w-full rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy placeholder:text-[#a9bccd] focus:outline-none'

function Row({ label, children }) {
  return (
    <label className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-[12px]">
      <span className="text-right text-[13px] font-semibold text-[#5b7690]">{label}:</span>
      {children}
    </label>
  )
}

// --- pre-fill from the current tree selection ------------------------------

function ancestorsOf(tree, targetId) {
  const path = []
  function visit(node, trail) {
    if (node.id === targetId) {
      path.push(...trail, node)
      return true
    }
    return node.children.some((child) => visit(child, [...trail, node]))
  }
  visit(tree, [])
  return path
}

function defaultVesselId(tree, selectedNode) {
  const chain = selectedNode ? ancestorsOf(tree, selectedNode.id) : []
  return chain.find((node) => node.category === 'Vessel')?.id ?? tree.children[0]?.id ?? ''
}

// Default to the type this selection can contain; leaves default to their own type.
function defaultCategory(selectedNode) {
  if (!selectedNode) return 'Major System'
  const rule = HIERARCHY_RULES.find((entry) => entry.parentCategory === selectedNode.category)
  if (rule) return rule.category
  return HIERARCHY_RULES.some((entry) => entry.category === selectedNode.category)
    ? selectedNode.category
    : 'Major System'
}

function defaultPicks(tree, selectedNode) {
  if (!selectedNode) return {}
  const picks = {}
  for (const node of ancestorsOf(tree, selectedNode.id)) {
    if (['Major System', 'Sub-System', 'Component'].includes(node.category)) {
      picks[node.category] = node.id
    }
  }
  return picks
}
