import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { ORDER_COLUMNS, ORDER_SECTIONS } from '@/data/orderSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function OrderSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Order Search"
      menus={MENUS}
      toolbar={['print', 'find']}
      sections={ORDER_SECTIONS}
      columns={ORDER_COLUMNS}
      pagination
      panelWidth="34%"
    />
  )
}
