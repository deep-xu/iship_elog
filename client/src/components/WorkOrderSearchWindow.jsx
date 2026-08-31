import QueryWindow from './QueryWindow.jsx'
import {
  WORK_ORDER_SEARCH_COLUMNS,
  WORK_ORDER_SEARCH_ROWS,
  WORK_ORDER_SEARCH_SECTIONS,
} from '../data/workOrderSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function WorkOrderSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Work Order Search"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find']}
      sections={WORK_ORDER_SEARCH_SECTIONS}
      columns={WORK_ORDER_SEARCH_COLUMNS}
      rows={WORK_ORDER_SEARCH_ROWS}
      panelWidth="42%"
    />
  )
}
