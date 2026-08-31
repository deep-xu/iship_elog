import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  Crosshair,
  FilePlus2,
  FileSearch,
  GitFork,
  ListTree,
  Search,
  SearchCode,
  Trash2,
} from 'lucide-react'
import {
  DEFAULT_EXPANDED_IDS,
  EQUIPMENT_DEFAULT_SELECTED_ID,
  EQUIPMENT_ROOT_ID,
  EQUIPMENT_TREE,
  EQUIPMENT_VESSEL_NAMES,
  filterEquipmentTree,
  findEquipmentNodeById,
  flattenEquipmentBranch,
  addEquipmentNode,
  applyEquipmentAdditions,
  loadEquipmentAdditions,
  saveEquipmentAdditions,
  buildEquipmentDetail,
  buildPartDetail,
} from '../data/equipment.js'
import AddEquipmentDialog from './AddEquipmentDialog.jsx'
import EquipmentDetailWindow from './EquipmentDetailWindow.jsx'
import PartDetailWindow from './PartDetailWindow.jsx'
import { FIND_EQUIPMENT_SECTIONS } from '../data/findEquipment.js'
import { FIND_PART_SECTIONS } from '../data/findPart.js'

const BROWSE_COLUMNS = [
  { key: 'rowNumber', label: '#', width: '60px', align: 'center' },
  { key: 'label', label: 'Component Tree', width: '44%', align: 'left' },
  { key: 'level', label: 'Level', width: '90px', align: 'center' },
  { key: 'category', label: 'Category', width: '220px', align: 'left' },
  { key: 'partNo', label: 'Part No.', width: '220px', align: 'left' },
  { key: 'makerRemarks', label: 'Maker / Remarks', width: '220px', align: 'left' },
]

const EQUIPMENT_RESULT_COLUMNS = [
  { key: 'label', label: 'Equipment', width: '28%' },
  { key: 'category', label: 'Category', width: '16%' },
  { key: 'level', label: 'Level', width: '70px', align: 'center' },
  { key: 'partNo', label: 'Part No.', width: '17%' },
  { key: 'makerRemarks', label: 'Maker', width: '16%' },
  { key: 'pathLabel', label: 'Path', width: '23%' },
]

const PART_RESULT_COLUMNS = [
  { key: 'partNo', label: 'Part No.', width: '18%' },
  { key: 'label', label: 'Part', width: '24%' },
  { key: 'makerRemarks', label: 'Maker', width: '16%' },
  { key: 'parentLabel', label: 'Parent Equipment', width: '20%' },
  { key: 'category', label: 'Category', width: '12%' },
  { key: 'pathLabel', label: 'Path', width: '24%' },
]

const DEFAULT_VESSEL_NAME = EQUIPMENT_VESSEL_NAMES[0] ?? ''

const MODES = [
  { id: 'browse', label: 'Browse' },
  { id: 'equipment', label: 'Find Equipment' },
  { id: 'part', label: 'Find Part' },
]

const EQUIPMENT_FORM = decorateSections('equipment', FIND_EQUIPMENT_SECTIONS, {
  Ship: DEFAULT_VESSEL_NAME,
})
const PART_FORM = decorateSections('part', FIND_PART_SECTIONS, {
  Ship: DEFAULT_VESSEL_NAME,
})
function catalogsFor(root) {
  const catalog = buildCatalog(root)
  return {
    partItems: catalog.filter(
      (item) =>
        item.id !== EQUIPMENT_ROOT_ID &&
        ['Spare Part', 'Consumable / Stores', 'Consumable / Store Item'].includes(item.category),
    ),
    equipmentItems: catalog.filter((item) => item.id !== EQUIPMENT_ROOT_ID),
  }
}

export default function EquipmentExplorer({ initialMode = 'browse', onMinimize, onClose, preview = false }) {
  const [tree, setTree] = useState(() => applyEquipmentAdditions(EQUIPMENT_TREE, loadEquipmentAdditions()))
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [detailNodeId, setDetailNodeId] = useState(null)
  const [detailMinimized, setDetailMinimized] = useState(false)
  const [partNodeId, setPartNodeId] = useState(null)
  const [partMinimized, setPartMinimized] = useState(false)
  const [mode, setMode] = useState(initialMode)
  const [selectedId, setSelectedId] = useState(EQUIPMENT_DEFAULT_SELECTED_ID)
  const [quickSearch, setQuickSearch] = useState('')
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(DEFAULT_EXPANDED_IDS.map((id) => [id, true])),
  )
  const [collapsedEquipment, setCollapsedEquipment] = useState({})
  const [collapsedPart, setCollapsedPart] = useState({})
  const [equipmentForm, setEquipmentForm] = useState(EQUIPMENT_FORM.initialState)
  const [partForm, setPartForm] = useState(PART_FORM.initialState)
  const [equipmentResults, setEquipmentResults] = useState([])
  const [partResults, setPartResults] = useState([])
  const [statusMessage, setStatusMessage] = useState(
    initialMode === 'browse'
      ? 'Browse the tree or switch to a search mode.'
      : `Use ${initialMode === 'equipment' ? 'Find Equipment' : 'Find Part'} to run a search.`,
  )

  const { partItems, equipmentItems } = useMemo(() => catalogsFor(tree), [tree])
  const filteredTree = filterEquipmentTree(tree, mode === 'browse' ? quickSearch : '') ?? {
    ...tree,
    children: [],
  }
  const selectedNode = findEquipmentNodeById(tree, selectedId) ?? tree
  const browseRows = flattenEquipmentBranch(
    selectedNode,
    selectedNode.id !== EQUIPMENT_ROOT_ID && selectedNode.category !== 'Vessel',
  )
  const visibleEquipmentResults = filterSearchResults(equipmentResults, quickSearch)
  const visiblePartResults = filterSearchResults(partResults, quickSearch)

  function handleAddNode(parentId, draft) {
    const result = addEquipmentNode(tree, parentId, draft)
    if (!result) {
      setStatusMessage('Could not find that parent in the hierarchy.')
      return
    }

    setTree(result.tree)
    setShowAddDialog(false)
    setSelectedId(parentId)
    setSelectedRowId(result.node.id)
    setExpanded((current) => ({ ...current, [parentId]: true }))

    // Open the matching detail form for the node that was just created.
    if (draft.category === 'Major System' || draft.category === 'Sub-System') {
      setDetailNodeId(result.node.id)
      setDetailMinimized(false)
    } else if (PART_CATEGORIES.includes(draft.category)) {
      setPartNodeId(result.node.id)
      setPartMinimized(false)
    }

    const persisted = saveEquipmentAdditions([
      ...loadEquipmentAdditions(),
      { parentId, draft },
    ])
    const parentLabel = findEquipmentNodeById(tree, parentId)?.label ?? 'the hierarchy'
    setStatusMessage(
      persisted
        ? `Added ${draft.category} "${draft.label}" under ${parentLabel}.`
        : `Added "${draft.label}" (not saved — storage unavailable).`,
    )
  }

  function handleOpenInExplorer(item) {
    const nextSelectedId = item.level === 4 && item.parentId ? item.parentId : item.id
    setSelectedId(nextSelectedId)
    setSelectedRowId(item.id)
    setExpanded((current) => expandAncestors(current, item.ancestorIds))
    setMode('browse')
    setQuickSearch('')
    setStatusMessage(`Opened ${item.label} in Equipment Explorer.`)
  }

  const PART_CATEGORIES = ['Component', 'Spare Part', 'Consumable / Store Item', 'Consumable / Stores']

  function handleActivateNode(node) {
    // Major System / Sub-System -> Equipment card. Component / Part -> Part card.
    if (node.category === 'Major System' || node.category === 'Sub-System') {
      setDetailNodeId(node.id)
      setDetailMinimized(false)
    } else if (PART_CATEGORIES.includes(node.category)) {
      setPartNodeId(node.id)
      setPartMinimized(false)
    }
  }

  const detail = detailNodeId ? buildEquipmentDetail(tree, detailNodeId) : null
  const partDetail = partNodeId ? buildPartDetail(tree, partNodeId) : null

  function handleEquipmentSearch() {
    const results = runEquipmentSearch(equipmentForm, equipmentItems)
    setEquipmentResults(results)
    setMode('equipment')
    setStatusMessage(`${results.length} equipment result${results.length === 1 ? '' : 's'} found.`)
  }

  function handlePartSearch() {
    const results = runPartSearch(partForm, partItems)
    setPartResults(results)
    setMode('part')
    setStatusMessage(`${results.length} part result${results.length === 1 ? '' : 's'} found.`)
  }

  function handleSaveForm(formMode) {
    const payload = formMode === 'equipment' ? equipmentForm : partForm
    const storageKey =
      formMode === 'equipment' ? 'ns5-equipment-explorer-find-equipment' : 'ns5-equipment-explorer-find-part'

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(payload))
      setStatusMessage(`${formMode === 'equipment' ? 'Find Equipment' : 'Find Part'} search saved locally.`)
    } catch {
      setStatusMessage('Saving is unavailable in this browser session.')
    }
  }

  function handleResetForm(formMode) {
    if (formMode === 'equipment') {
      setEquipmentForm(EQUIPMENT_FORM.initialState)
      setEquipmentResults([])
    } else {
      setPartForm(PART_FORM.initialState)
      setPartResults([])
    }

    setQuickSearch('')
    setStatusMessage(`${formMode === 'equipment' ? 'Find Equipment' : 'Find Part'} form reset.`)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <TitleBar onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <WindowToolbar
        mode={mode}
        onAdd={() => setShowAddDialog(true)}
        onModeChange={setMode}
        quickSearch={quickSearch}
        setQuickSearch={setQuickSearch}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="flex min-h-0 flex-1">
        <div className={`flex min-w-0 shrink-0 flex-col bg-white ${mode === 'browse' ? 'w-[36%]' : 'w-[47%]'}`}>
          <ModeTabs mode={mode} onChange={setMode} />

          {mode === 'browse' ? (
            <BrowsePane
              expanded={expanded}
              filteredTree={filteredTree}
              onSelect={setSelectedId}
              onActivate={handleActivateNode}
              quickSearch={quickSearch}
              selectedId={selectedId}
              setExpanded={setExpanded}
            />
          ) : mode === 'equipment' ? (
            <SearchFormPane
              collapsed={collapsedEquipment}
              formState={equipmentForm}
              onFieldChange={setEquipmentForm}
              onReset={() => handleResetForm('equipment')}
              onSave={() => handleSaveForm('equipment')}
              onSearch={handleEquipmentSearch}
              sections={EQUIPMENT_FORM.sections}
              setCollapsed={setCollapsedEquipment}
            />
          ) : (
            <SearchFormPane
              collapsed={collapsedPart}
              formState={partForm}
              onFieldChange={setPartForm}
              onReset={() => handleResetForm('part')}
              onSave={() => handleSaveForm('part')}
              onSearch={handlePartSearch}
              sections={PART_FORM.sections}
              setCollapsed={setCollapsedPart}
            />
          )}
        </div>

        <div className="w-[3px] shrink-0 bg-[#d8e7f2]" />

        {mode === 'browse' ? (
          (selectedNode.category === 'Major System' || selectedNode.category === 'Sub-System') ? (
            <div className="flex min-w-0 flex-1 flex-col bg-white">
              <EquipmentDetailWindow key={selectedNode.id} inline detail={buildEquipmentDetail(tree, selectedNode.id)} />
            </div>
          ) : PART_CATEGORIES.includes(selectedNode.category) ? (
            <div className="flex min-w-0 flex-1 flex-col bg-white">
              <PartDetailWindow key={selectedNode.id} inline detail={buildPartDetail(tree, selectedNode.id)} />
            </div>
          ) : (
            <BrowseGridPane
              rows={browseRows}
              selectedLabel={selectedNode.label}
              selectedNode={selectedNode}
              selectedRowId={selectedRowId}
              onSelectRow={setSelectedRowId}
            />
          )
        ) : mode === 'equipment' ? (
          <SearchResultsPane
            columns={EQUIPMENT_RESULT_COLUMNS}
            emptyMessage="Run a Find Equipment search to see matching hierarchy items."
            modeLabel="Find Equipment"
            onOpenInExplorer={handleOpenInExplorer}
            results={visibleEquipmentResults}
            statusMessage={statusMessage}
            title="Equipment Search Results"
          />
        ) : (
          <SearchResultsPane
            columns={PART_RESULT_COLUMNS}
            emptyMessage="Run a Find Part search to see matching spare parts and consumables."
            modeLabel="Find Part"
            onOpenInExplorer={handleOpenInExplorer}
            results={visiblePartResults}
            statusMessage={statusMessage}
            title="Part Search Results"
          />
        )}
      </div>

        <div className="flex h-[30px] shrink-0 items-center border-t border-[#e4edf3] bg-[#fbfdff] px-[14px] text-[12px] text-[#64829d]">
          {statusMessage}
        </div>
      </div>

      {showAddDialog ? (
        <AddEquipmentDialog
          tree={tree}
          selectedNode={selectedNode}
          onCancel={() => setShowAddDialog(false)}
          onAdd={handleAddNode}
        />
      ) : null}

      {detail && !detailMinimized ? (
        <EquipmentDetailWindow
          detail={detail}
          onMinimize={() => setDetailMinimized(true)}
          onClose={() => setDetailNodeId(null)}
        />
      ) : null}

      {partDetail && !partMinimized ? (
        <PartDetailWindow
          detail={partDetail}
          onMinimize={() => setPartMinimized(true)}
          onClose={() => setPartNodeId(null)}
        />
      ) : null}
    </div>
  )
}

function TitleBar({ onMinimize, onClose, preview }) {
  return (
    <div className="flex h-[62px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[20px]">
      <TargetIcon />
      <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">[36] Equipment Explorer</span>

      <div className="ml-auto flex items-center gap-[8px] pr-[14px]">
        <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
            <line x1="3" y1="11" x2="13" y2="11" />
          </svg>
        </WindowActionButton>
        <WindowActionButton label="Maximize">
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.7">
            <rect x="3" y="3" width="10" height="10" rx="1.5" />
          </svg>
        </WindowActionButton>
        <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </WindowActionButton>
      </div>
    </div>
  )
}

function WindowActionButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      {children}
    </button>
  )
}

function WindowToolbar({ mode, onAdd, onModeChange, quickSearch, setQuickSearch }) {
  const placeholder =
    mode === 'browse' ? 'Search hierarchy...' : `Filter ${mode === 'equipment' ? 'equipment' : 'part'} results...`

  return (
    <div className="flex h-[58px] shrink-0 items-center gap-[6px] border-b border-[#e4edf3] bg-white px-[18px] text-ns-navy">
      <ToolIcon label="Browse" active={mode === 'browse'} onClick={() => onModeChange('browse')}>
        <Hierarchy />
      </ToolIcon>
      <ToolIcon label="Find Equipment" active={mode === 'equipment'} onClick={() => onModeChange('equipment')}>
        <MagText />
      </ToolIcon>
      <ToolIcon label="Find Part" active={mode === 'part'} onClick={() => onModeChange('part')}>
        <MagGear />
      </ToolIcon>
      <Sep />
      <ToolIcon label="Add" onClick={onAdd}>
        <DocPlus />
      </ToolIcon>

      <div className="ml-auto flex w-[300px] items-center gap-[6px] rounded-full border border-[#d7e7ec] bg-[#f9fcfe] px-[10px] py-[5px]">
        <SearchIcon />
        <span className="text-[12px] text-ns-navy">▾</span>
        <input
          type="text"
          value={quickSearch}
          onChange={(event) => setQuickSearch(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-ns-navy placeholder:text-[#7a8ea4] focus:outline-none"
        />
      </div>
    </div>
  )
}

function ToolIcon({ active = false, children, label, muted, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] p-[5px] transition focus:outline-none ${
        muted
          ? 'text-neutral-400'
          : active
            ? 'bg-[#e4eefc] text-ns-blue shadow-sm'
            : 'text-ns-navy hover:bg-[#eef5fb]'
      }`}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <span className="mx-[4px] h-[22px] w-px shrink-0 bg-[#e4edf3]" />
}

function ModeTabs({ mode, onChange }) {
  return (
      <div className="flex h-[54px] shrink-0 border-b border-[#d7e7ec] bg-[#f4f9fc]">
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`font-heading flex flex-1 items-center justify-center px-[10px] text-[18px] font-semibold focus:outline-none ${
            mode === item.id ? 'bg-[#cfe8f0] text-ns-navy' : 'bg-[#eef5f8] text-ns-muted'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function BrowsePane({ expanded, filteredTree, onSelect, onActivate, quickSearch, selectedId, setExpanded }) {
  const autoExpand = quickSearch.trim().length > 0

  return (
    <>
      <div className="border-b border-[#e2edf5] px-[12px] py-[10px] text-[12px] text-[#6d89a2]">
        Click a branch to load its detailed hierarchy in the grid. Double-click a system/sub-system for its Equipment card, or a component/part for its Part card.
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-[10px] py-[8px]">
        <TreeNode
          autoExpand={autoExpand}
          depth={0}
          expanded={expanded}
          node={filteredTree}
          onSelect={onSelect}
          onActivate={onActivate}
          selectedId={selectedId}
          setExpanded={setExpanded}
        />
      </div>
    </>
  )
}

function SearchFormPane({
  collapsed,
  formState,
  onFieldChange,
  onReset,
  onSave,
  onSearch,
  sections,
  setCollapsed,
}) {
  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4faff]">
        {sections.map((section) => (
          <div key={section.title}>
            <button
              type="button"
              onClick={() => setCollapsed((current) => ({ ...current, [section.title]: !current[section.title] }))}
              className="flex w-full items-center bg-ns-navy px-[14px] py-[8px] text-left text-[17px] font-bold text-white focus:outline-none"
            >
              <span className="flex-1">{section.title}</span>
              <svg
                viewBox="0 0 24 24"
                className={`h-[16px] w-[16px] fill-none stroke-white ${collapsed[section.title] ? 'rotate-180' : ''}`}
                strokeWidth="2.4"
              >
                <polyline points="5,14 12,7 19,14" />
              </svg>
            </button>

            {!collapsed[section.title] &&
              section.fields.map((field) => (
                <EditableField
                  key={field.key}
                  field={field}
                  onFieldChange={onFieldChange}
                  value={formState[field.key]}
                />
              ))}
          </div>
        ))}
      </div>

      <div className="flex h-[56px] shrink-0 items-center border-t border-[#d9e7f1] bg-[#eaf4fb] px-[14px]">
        <button
          type="button"
          onClick={onSave}
          className="bg-ns-navy px-[26px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
        >
          Save
        </button>
        <div className="ml-auto flex gap-[6px]">
          <button
            type="button"
            onClick={onReset}
            className="bg-ns-navy px-[22px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onSearch}
            className="bg-ns-navy px-[22px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

function EditableField({ field, onFieldChange, value }) {
  const options = getFieldOptions(field)

  return (
    <div className="flex items-center gap-[10px] border-b border-[#e4edf4] bg-white px-[14px] py-[7px] text-[16px] text-ns-navy">
      <span className="w-[46%] shrink-0 text-right">{field.label ? `${field.label}:` : ''}</span>

      {field.checkbox ? (
        <button
          type="button"
          onClick={() => onFieldChange((current) => ({ ...current, [field.key]: !current[field.key] }))}
          className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[2px] border ${
            value ? 'border-ns-blue bg-ns-blue' : 'border-[#c7d6e0] bg-white'
          }`}
        >
          {value ? (
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-white" strokeWidth="2.4">
              <polyline points="3,8 6.5,11.5 13,4.5" />
            </svg>
          ) : null}
        </button>
      ) : options ? (
        <span className="flex min-w-0 flex-1 items-center border-b border-[#e4edf3] pb-[2px]">
          <select
            value={value}
            onChange={(event) => onFieldChange((current) => ({ ...current, [field.key]: event.target.value }))}
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ns-navy focus:outline-none"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      ) : (
        <span className="flex min-w-0 flex-1 items-center border-b border-[#e4edf3] pb-[2px]">
          <input
            type="text"
            value={value}
            onChange={(event) => onFieldChange((current) => ({ ...current, [field.key]: event.target.value }))}
            placeholder={field.muted ? '-- Select --' : ''}
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ns-navy placeholder:text-neutral-500 focus:outline-none"
          />
          {field.chevron ? (
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          ) : null}
        </span>
      )}
    </div>
  )
}

function TreeNode({ autoExpand, depth, expanded, node, onSelect, onActivate, selectedId, setExpanded }) {
  const hasChildren = node.children.length > 0
  const isOpen = autoExpand || expanded[node.id]
  const isSelected = node.id === selectedId

  return (
    <div>
      <div
        className={`flex min-h-[24px] items-center gap-[6px] rounded-sm px-[4px] ${
          isSelected ? 'bg-[#e2f0fb]' : 'hover:bg-[#f0f8fe]'
        }`}
        style={{ paddingLeft: `${depth * 14}px` }}
      >
        <button
          type="button"
          disabled={!hasChildren}
          onClick={() => {
            if (!hasChildren || autoExpand) {
              return
            }

            setExpanded((current) => ({
              ...current,
              [node.id]: !current[node.id],
            }))
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

        <span className="shrink-0">{iconForNode(node)}</span>

        <button
          type="button"
          onClick={() => onSelect(node.id)}
          onDoubleClick={() => onActivate?.(node)}
          className={`truncate text-left text-[15px] leading-[20px] focus:outline-none ${
            node.level === 0 ? 'bg-[#d7e7f3] px-[3px] text-ns-navy' : 'text-ns-tree-text'
          } ${node.level > 0 && node.level < 4 ? 'font-semibold' : ''}`}
        >
          {node.label}
        </button>
      </div>

      {hasChildren && isOpen ? (
        <div className="ml-[6px] border-l border-dotted border-ns-tree-line">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              autoExpand={autoExpand}
              depth={depth + 1}
              expanded={expanded}
              node={child}
              onSelect={onSelect}
              onActivate={onActivate}
              selectedId={selectedId}
              setExpanded={setExpanded}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function BrowseGridPane({ rows, selectedLabel, selectedNode, selectedRowId, onSelectRow }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-[34px] shrink-0 items-center justify-between border-b border-[#dbe8f1] bg-[#f5faff] px-[12px] text-[14px] text-ns-navy">
        <span className="truncate font-semibold">{selectedLabel}</span>
        <span className="shrink-0 text-[12px] text-neutral-600">
          {rows.length} rows · {selectedNode.category}
        </span>
      </div>

      <ResultsGrid columns={BROWSE_COLUMNS} rows={rows} selectedRowId={selectedRowId ?? selectedNode.id} />
    </div>
  )
}

function SearchResultsPane({
  columns,
  emptyMessage,
  modeLabel,
  onOpenInExplorer,
  results,
  statusMessage,
  title,
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-[34px] shrink-0 items-center justify-between border-b border-[#dbe8f1] bg-[#f5faff] px-[12px] text-[14px] text-ns-navy">
        <span className="truncate font-semibold">{title}</span>
        <span className="shrink-0 text-[12px] text-neutral-600">
          {results.length} rows · {modeLabel}
        </span>
      </div>

      {results.length > 0 ? (
        <ResultsGrid columns={columns} rows={results} onRowClick={onOpenInExplorer} />
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center p-[24px] text-center text-[16px] text-neutral-500">
          <div>
            <div>{emptyMessage}</div>
            <div className="mt-[8px] text-[13px]">{statusMessage}</div>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultsGrid({ columns, onRowClick, rows, selectedRowId }) {
  return (
    <>
      <div className="overflow-x-auto border-b border-[#0f2f2a] bg-ns-navy text-white">
        <div className="flex min-w-[980px]">
          {columns.map((column) => (
            <div
              key={column.key}
              style={{ width: column.width }}
              className={`flex h-[38px] shrink-0 items-center border-r border-white/25 px-[8px] text-[15px] font-semibold ${
                column.align === 'center' ? 'justify-center text-center' : ''
              }`}
            >
              {column.label}
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="min-w-[980px]">
          {rows.map((row) => {
            const isSelected = row.id === selectedRowId

            return (
              <button
                key={row.id}
                type="button"
                onClick={() => onRowClick?.(row)}
                className={`flex min-h-[36px] w-full border-b border-[#e1e9e5] text-left text-[15px] focus:outline-none ${
                  isSelected ? 'bg-[#e2f0fb]' : 'bg-white hover:bg-[#f3f9fe]'
                }`}
              >
                {columns.map((column) => (
                  <Cell key={column.key} width={column.width} align={column.align}>
                    {renderCellValue(row, column.key)}
                  </Cell>
                ))}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

function Cell({ align = 'left', children, width }) {
  return (
    <span
      style={{ width }}
      className={`flex shrink-0 items-center px-[8px] py-[5px] ${
        align === 'center' ? 'justify-center text-center' : ''
      }`}
    >
      {children}
    </span>
  )
}

function renderCellValue(row, key) {
  if (key === 'label') {
    return (
      <span
        className={`${row.level < 4 ? 'font-semibold text-[#102f2b]' : 'text-[#243934]'}`}
        style={{ paddingLeft: row.rowNumber ? `${Math.max(row.level - 1, 0) * 18}px` : '0' }}
      >
        {row.rowNumber && row.level < 4 ? '▸ ' : ''}
        {row[key]}
      </span>
    )
  }

  return row[key] ?? ''
}

function iconForNode(node) {
  if (node.level === 0) {
    return <VesselIcon />
  }

  if (node.category === 'Consumable / Stores') {
    return <StoresIcon />
  }

  if (node.level === 4) {
    return <LeafDot />
  }

  return <SystemIcon />
}

function decorateSections(prefix, sections, overrides = {}) {
  const initialState = {}
  const decoratedSections = sections.map((section) => ({
    ...section,
    fields: section.fields.map((field, index) => {
      const key = `${prefix}-${slugify(section.title)}-${index}`
      const initialValue =
        overrides[field.label] ??
        (field.checkbox ? Boolean(field.checked) : typeof field.value === 'string' ? field.value : '')

      initialState[key] = initialValue

      return { ...field, key }
    }),
  }))

  return { sections: decoratedSections, initialState }
}

function buildCatalog(root) {
  const rows = []

  function visit(node, parent = null, path = [], ancestorIds = []) {
    const currentPath = [...path, node.label]
    const currentAncestors = [...ancestorIds, node.id]
    const entry = {
      ...node,
      ancestorIds: currentAncestors,
      parentId: parent?.id ?? null,
      parentLabel: parent?.label ?? '',
      pathLabel: currentPath.join(' > '),
    }

    rows.push(entry)

    for (const child of node.children) {
      visit(child, node, currentPath, currentAncestors)
    }
  }

  visit(root)

  return rows
}

function expandAncestors(current, ancestorIds) {
  const next = { ...current }

  for (const id of ancestorIds) {
    next[id] = true
  }

  return next
}

function runEquipmentSearch(formState, equipmentItems) {
  const filters = {
    equipmentCode: getTextFilter(formState, 'Equipment Code'),
    completeName: getTextFilter(formState, 'Complete Name'),
    maintainedPart: getBooleanFilter(formState, 'Maintained Part'),
    maintainedPartName: getTextFilter(formState, 'Maintained Part Name'),
    keyword: getTextFilter(formState, 'Keyword'),
    inventoryOnHand: getBooleanFilter(formState, 'Inventory On Hand'),
    manufacturer: normalizeSelect(getTextFilter(formState, 'Manufacturer')),
    source: normalizeSelect(getTextFilter(formState, 'Source')),
    model: getTextFilter(formState, 'Model'),
    type: getTextFilter(formState, 'Type'),
    serialNo: getTextFilter(formState, 'Serial No.'),
    size: getTextFilter(formState, 'Size'),
    location: getTextFilter(formState, 'Location'),
    softwareVersion: getTextFilter(formState, 'Software Version'),
    equipmentCriticality: normalizeSelect(getTextFilter(formState, 'Equipment Criticality')),
    eqClassName: getTextFilter(formState, 'Eq Class Name'),
    eqClassCode: getTextFilter(formState, 'Eq Class Code'),
    identifyAs: normalizeSelect(getTextFilter(formState, 'Identify Equipment As')),
  }

  return equipmentItems.filter((item) => {
    if (!filters.maintainedPart && item.level === 4) {
      return false
    }

    if (filters.inventoryOnHand && !item.partNo) {
      return false
    }

    if (filters.identifyAs && !includesValue(item.category, filters.identifyAs)) {
      return false
    }

    if (filters.completeName && !includesValue(item.label, filters.completeName)) {
      return false
    }

    if (filters.maintainedPartName && !includesValue(item.label, filters.maintainedPartName)) {
      return false
    }

    if (filters.equipmentCode && !includesValue([item.id, item.partNo], filters.equipmentCode)) {
      return false
    }

    if (filters.keyword && !includesValue([item.label, item.category, item.partNo, item.makerRemarks, item.pathLabel], filters.keyword)) {
      return false
    }

    if (filters.manufacturer && !includesValue(item.makerRemarks, filters.manufacturer)) {
      return false
    }

    if (filters.source && !includesValue(item.makerRemarks, filters.source)) {
      return false
    }

    if (filters.model && !includesValue([item.label, item.pathLabel], filters.model)) {
      return false
    }

    if (filters.type && !includesValue([item.label, item.category], filters.type)) {
      return false
    }

    if (filters.serialNo && !includesValue([item.partNo, item.pathLabel], filters.serialNo)) {
      return false
    }

    if (filters.size && !includesValue(item.label, filters.size)) {
      return false
    }

    if (filters.location && !includesValue(item.pathLabel, filters.location)) {
      return false
    }

    if (filters.softwareVersion && !includesValue(item.label, filters.softwareVersion)) {
      return false
    }

    if (filters.equipmentCriticality && !includesValue(item.category, filters.equipmentCriticality)) {
      return false
    }

    if (filters.eqClassName && !includesValue([item.category, item.label], filters.eqClassName)) {
      return false
    }

    if (filters.eqClassCode && !includesValue([item.id, item.category], filters.eqClassCode)) {
      return false
    }

    return true
  })
}

function runPartSearch(formState, partItems) {
  const ignorePunctuation = getBooleanFilter(formState, 'Ignore Punctuation')
  const filters = {
    partNo: getTextFilter(formState, 'Part No.'),
    partNoRef: getTextFilter(formState, 'Part No Ref.'),
    pinNo: getTextFilter(formState, 'PIN No.'),
    maradNo: getTextFilter(formState, 'MARAD No.'),
    imoNo: getTextFilter(formState, 'IMO No.'),
    nsId: getBooleanFilter(formState, 'NS ID'),
    barcode: getTextFilter(formState, 'Barcode'),
    inventoryOnHand: getBooleanFilter(formState, 'Inventory On Hand'),
    searchString: getTextFilter(formState, 'Search String'),
    manufacturerRecommended: getBooleanFilter(formState, 'Manufacturer Recommended'),
    warehoused: getBooleanFilter(formState, 'Warehoused'),
    stocked: getBooleanFilter(formState, 'Stocked'),
  }

  return partItems.filter((item) => {
    const partNo = ignorePunctuation ? stripPunctuation(item.partNo) : item.partNo
    const partText = ignorePunctuation ? stripPunctuation(filters.partNo) : filters.partNo

    if (filters.partNo && !includesValue(partNo, partText)) {
      return false
    }

    if (filters.partNoRef && !includesValue([item.partNo, item.pathLabel], filters.partNoRef)) {
      return false
    }

    if (filters.pinNo && !includesValue(item.partNo, filters.pinNo)) {
      return false
    }

    if (filters.maradNo && !includesValue(item.partNo, filters.maradNo)) {
      return false
    }

    if (filters.imoNo && !includesValue(item.partNo, filters.imoNo)) {
      return false
    }

    if (filters.nsId && !item.partNo) {
      return false
    }

    if (filters.barcode && !includesValue(item.partNo, filters.barcode)) {
      return false
    }

    if (filters.inventoryOnHand && !item.partNo) {
      return false
    }

    if (filters.searchString && !includesValue([item.label, item.pathLabel, item.makerRemarks], filters.searchString)) {
      return false
    }

    if (filters.manufacturerRecommended && !item.makerRemarks) {
      return false
    }

    if (filters.warehoused && item.category !== 'Consumable / Stores') {
      return false
    }

    if (filters.stocked && !item.partNo) {
      return false
    }

    return true
  })
}

function filterSearchResults(results, quickSearch) {
  const query = quickSearch.trim().toLowerCase()

  if (!query) {
    return results
  }

  return results.filter((row) =>
    [row.label, row.category, row.partNo, row.makerRemarks, row.pathLabel, row.parentLabel]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query)),
  )
}

function getFieldOptions(field) {
  const optionsMap = {
    Ship: EQUIPMENT_VESSEL_NAMES,
    Options: ['All these words', 'Any of these words', 'Exact phrase'],
    Manufacturer: ['-- Select --', 'MAN B&W', 'Yanmar', 'Aalborg', 'Rolls-Royce', 'MacGregor', 'Alfa Laval'],
    Source: ['-- Select --', 'Ship Store', 'OEM', 'Warehouse'],
    'Identify Equipment As': ['-- Select --', 'Major System', 'Sub-System', 'Component', 'Spare Part'],
    'Equipment Index': ['-- Select --', 'Propulsion', 'Auxiliary', 'Deck', 'Safety', 'Stores'],
    'Subject Index': ['-- Select --', 'Mechanical', 'Electrical', 'Consumables'],
    'Failure Class': ['-- Select --', 'Critical', 'Major', 'Minor'],
    'Monitoring Type': ['-- Select --', 'Condition', 'Routine', 'Class'],
    'Global Part Criticality': ['-- Select --', 'Critical', 'A', 'B', 'C'],
    'Ship Part Criticality': ['-- Select --', 'Critical', 'A', 'B', 'C'],
    'Interchangeability Term': ['-- Select --', 'Exact', 'Alternative', 'Equivalent'],
    'Item Category': ['-- Select --', 'Spare Part', 'Consumable / Stores'],
    'Serialized Item Reference': ['-- Select --', 'Required', 'Optional'],
    'Mooring Line Type': ['-- Select --', 'Wire', 'Synthetic', 'Mixed'],
    'Part Attributes': ['-- Select --', 'Hazardous', 'Non-Hazardous'],
    'Hazard Class': ['-- Select --', 'Class 2', 'Class 3', 'Class 8', 'Class 9'],
    'UN Hazard Code': ['-- Select --', 'UN1203', 'UN1263', 'UN1950'],
    'IHM Hazard Type': ['-- Select --', 'Oil', 'Paint', 'Gas'],
    Maximum: ['-- Select --', 'High', 'Medium', 'Low'],
    Minimum: ['-- Select --', 'High', 'Medium', 'Low'],
    Reorder: ['-- Select --', 'High', 'Medium', 'Low'],
    WLL: ['-- Select --', '10T', '25T', '50T'],
    'Original Length': ['-- Select --', '110m', '220m', '500m'],
    'Original Diameter': ['-- Select --', '32mm', '48mm', '64mm'],
  }

  if (optionsMap[field.label]) {
    return optionsMap[field.label]
  }

  if (field.chevron && typeof field.value === 'string' && field.value.includes('Select')) {
    return ['-- Select --', 'Option 1', 'Option 2', 'Option 3']
  }

  return null
}

function getTextFilter(formState, label) {
  const key = findFieldKey(label)
  return key ? String(formState[key] ?? '').trim() : ''
}

function getBooleanFilter(formState, label) {
  const key = findFieldKey(label)
  return key ? Boolean(formState[key]) : false
}

function findFieldKey(label) {
  for (const field of [...EQUIPMENT_FORM.sections.flatMap((section) => section.fields), ...PART_FORM.sections.flatMap((section) => section.fields)]) {
    if (field.label === label) {
      return field.key
    }
  }

  return null
}

function normalizeSelect(value) {
  return value && !value.includes('Select') ? value : ''
}

function includesValue(target, query) {
  const haystack = Array.isArray(target) ? target.filter(Boolean).join(' ') : String(target ?? '')
  return haystack.toLowerCase().includes(String(query).toLowerCase())
}

function stripPunctuation(value) {
  return String(value ?? '').replace(/[^a-z0-9]/gi, '').toLowerCase()
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function TargetIcon() {
  return <Crosshair className="h-[17px] w-[17px] shrink-0 text-ns-blue" strokeWidth={2.1} />
}

function SearchIcon() {
  return <Search className="h-[16px] w-[16px] shrink-0 text-ns-navy" strokeWidth={2} />
}

function VesselIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
      <path d="M12 2l-5 4v2h10V6l-5-4zM5 10h14l-2 7H7l-2-7zm-1 9h16v3H4v-3z" />
    </svg>
  )
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
      <path d="M2 5h9l2 2h9v12H2V5zm3 5h14v2H5v-2zm0 4h9v2H5v-2z" />
    </svg>
  )
}

function StoresIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
      <path d="M9 3h6v2h4a2 2 0 012 2v12H3V7a2 2 0 012-2h4V3zm2 1v1h2V4h-2zM3 11h18v2H3v-2z" />
    </svg>
  )
}

function LeafDot() {
  return <span className="inline-block h-[8px] w-[8px] rounded-full bg-ns-navy" />
}

function QuestionMark() {
  return <CircleHelp className="h-full w-full" strokeWidth={1.9} />
}

function DocGear() {
  return <FileSearch className="h-full w-full" strokeWidth={1.9} />
}

function DocPlus() {
  return <FilePlus2 className="h-full w-full" strokeWidth={1.9} />
}

function Trash() {
  return <Trash2 className="h-full w-full" strokeWidth={1.9} />
}

function EyeArrow({ dir }) {
  return dir === 'left' ? (
    <GitFork className="h-full w-full -scale-x-100" strokeWidth={1.9} />
  ) : (
    <GitFork className="h-full w-full" strokeWidth={1.9} />
  )
}

function MagText() {
  return <SearchCode className="h-full w-full" strokeWidth={1.9} />
}

function MagGear() {
  return <FileSearch className="h-full w-full" strokeWidth={1.9} />
}

function Hierarchy() {
  return <ListTree className="h-full w-full" strokeWidth={1.9} />
}

function Chevron() {
  return <ChevronLeft className="h-full w-full" strokeWidth={2.3} />
}
