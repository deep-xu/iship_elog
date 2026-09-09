import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  PURCHASE_ORDER_COLUMNS,
  PURCHASE_ORDER_SECONDARY_COLUMNS,
  PURCHASE_ORDER_SECTIONS,
  PURCHASE_ORDER_TERTIARY_COLUMNS,
} from '@/data/purchaseOrderSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Process', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function PurchaseOrderSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Purchase Order Search"
      menus={MENUS}
      toolbar={['open', 'find']}
      sections={PURCHASE_ORDER_SECTIONS}
      columns={PURCHASE_ORDER_COLUMNS}
      secondaryColumns={PURCHASE_ORDER_SECONDARY_COLUMNS}
      tertiaryColumns={PURCHASE_ORDER_TERTIARY_COLUMNS}
      pagination
      panelWidth="47%"
    />
  )
}
