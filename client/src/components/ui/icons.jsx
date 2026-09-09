import {
  Archive,
  BriefcaseBusiness,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  ClipboardPenLine,
  FileText,
  FileSearch,
  FolderOpen,
  GitFork,
  LayoutGrid,
  LifeBuoy,
  ListTree,
  Mail,
  PackageSearch,
  PanelsTopLeft,
  SearchCode,
  Settings2,
  ShieldCheck,
  ShipWheel,
  ShoppingCart,
  Star,
  Wrench,
} from 'lucide-react'

function LucideIcon({ Icon, className = 'h-[26px] w-[26px]' }) {
  return <Icon className={className} strokeWidth={2.05} />
}

export function SectionIcon({ name, className = 'h-[26px] w-[26px]' }) {
  switch (name) {
    case 'dashboard':
      return <LucideIcon Icon={LayoutGrid} className={className} />
    case 'star':
      return <LucideIcon Icon={Star} className={className} />
    case 'clipboard':
      return <LucideIcon Icon={Wrench} className={className} />
    case 'cart':
      return <LucideIcon Icon={ShoppingCart} className={className} />
    case 'grid':
      return <LucideIcon Icon={Boxes} className={className} />
    case 'report':
      return <LucideIcon Icon={FileText} className={className} />
    case 'toolbox':
      return <LucideIcon Icon={Settings2} className={className} />
    case 'lifebuoy':
      return <LucideIcon Icon={LifeBuoy} className={className} />
    case 'windows':
      return <LucideIcon Icon={PanelsTopLeft} className={className} />
    case 'shield':
      return <LucideIcon Icon={ShieldCheck} className={className} />
    case 'folder':
      return <LucideIcon Icon={FolderOpen} className={className} />
    case 'briefcase':
      return <LucideIcon Icon={BriefcaseBusiness} className={className} />
    case 'ship':
      return <LucideIcon Icon={ShipWheel} className={className} />
    default:
      return <LucideIcon Icon={LayoutGrid} className={className} />
  }
}

function ToolbarIcon({ Icon }) {
  return <Icon className="h-full w-full" strokeWidth={1.9} />
}

export const HSQE_TOOLBAR_ICONS = [
  { key: 'cp', title: 'Compliance Plan', render: () => <ToolbarIcon Icon={ClipboardCheck} /> },
  { key: 'calendar', title: 'Calendar', render: () => <ToolbarIcon Icon={CalendarDays} /> },
  { key: 'au', title: 'Audit', render: () => <ToolbarIcon Icon={ClipboardList} /> },
  { key: 'ic', title: 'Incident', render: () => <ToolbarIcon Icon={ClipboardPenLine} /> },
  { key: 'vt', title: 'Vetting Document', render: () => <ToolbarIcon Icon={FileSearch} /> },
  { key: 'ob', title: 'Findings Query', render: () => <ToolbarIcon Icon={SearchCode} /> },
  { key: 'ii', title: 'Internal Inspections', render: () => <ToolbarIcon Icon={ListTree} /> },
  { key: 'js', title: 'Job Safety Analysis', render: () => <ToolbarIcon Icon={ClipboardCheck} /> },
  { key: 'pw', title: 'Permit to Work', render: () => <ToolbarIcon Icon={ClipboardPenLine} /> },
  { key: 'drawing', title: 'Drawing Search', render: () => <ToolbarIcon Icon={SearchCode} /> },
  { key: 'mail', title: 'Messages', render: () => <ToolbarIcon Icon={Mail} /> },
  { key: 'id', title: 'Serialized Item Query', render: () => <ToolbarIcon Icon={PackageSearch} /> },
  { key: 'archive', title: 'Archive', render: () => <ToolbarIcon Icon={Archive} /> },
]

export const TOOLBAR_ICONS = [
  { key: 'equipment-explorer', title: 'Equipment Explorer', render: () => <ToolbarIcon Icon={ListTree} /> },
  { key: 'hierarchy', title: 'Service Explorer', render: () => <ToolbarIcon Icon={GitFork} /> },
  { key: 'mp', title: 'Maintenance Plan', render: () => <ToolbarIcon Icon={CalendarDays} /> },
  { key: 'purchasing', title: 'Purchasing', render: () => <ToolbarIcon Icon={ShoppingCart} /> },
  { key: 'requisition', title: 'Requisition', render: () => <ToolbarIcon Icon={ClipboardPenLine} /> },
  { key: 'to', title: 'Transfer Order', render: () => <ToolbarIcon Icon={GitFork} /> },
  { key: 'ob', title: 'Onboard Query', render: () => <ToolbarIcon Icon={SearchCode} /> },
  { key: 'wo', title: 'Work Order', render: () => <ToolbarIcon Icon={ClipboardList} /> },
  { key: 'js', title: 'Job Safety Analysis', render: () => <ToolbarIcon Icon={ClipboardCheck} /> },
  { key: 'history', title: 'History', render: () => <ToolbarIcon Icon={CalendarDays} /> },
  { key: 'pw', title: 'Permit to Work', render: () => <ToolbarIcon Icon={ClipboardPenLine} /> },
  { key: 'drawing', title: 'Drawing Search', render: () => <ToolbarIcon Icon={SearchCode} /> },
  { key: 'mail', title: 'Messages', render: () => <ToolbarIcon Icon={Mail} /> },
  { key: 'id', title: 'Serialized Item Query', render: () => <ToolbarIcon Icon={PackageSearch} /> },
  { key: 'archive', title: 'Archive', render: () => <ToolbarIcon Icon={Archive} /> },
]
