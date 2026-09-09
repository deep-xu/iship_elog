import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  REQUISITION_SEARCH_COLUMNS,
  REQUISITION_SEARCH_SECONDARY_COLUMNS,
  REQUISITION_SEARCH_SECTIONS,
} from '@/data/requisitionSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function RequisitionSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Requisition Search"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find']}
      sections={REQUISITION_SEARCH_SECTIONS}
      columns={REQUISITION_SEARCH_COLUMNS}
      secondaryColumns={REQUISITION_SEARCH_SECONDARY_COLUMNS}
      pagination
      panelWidth="48%"
    />
  )
}
