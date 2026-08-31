import QueryWindow from './QueryWindow.jsx'
import {
  TRANSFER_ORDER_SEARCH_COLUMNS,
  TRANSFER_ORDER_SEARCH_SECONDARY_COLUMNS,
  TRANSFER_ORDER_SEARCH_SECTIONS,
} from '../data/transferOrderSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Process', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function TransferOrderSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Transfer Order Search"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find']}
      sections={TRANSFER_ORDER_SEARCH_SECTIONS}
      columns={TRANSFER_ORDER_SEARCH_COLUMNS}
      secondaryColumns={TRANSFER_ORDER_SEARCH_SECONDARY_COLUMNS}
      pagination
      panelWidth="40%"
    />
  )
}
