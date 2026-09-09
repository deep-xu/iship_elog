import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  RFQ_COLUMNS,
  RFQ_LINE_ITEM_COLUMNS,
  RFQ_SECTIONS,
} from '@/data/rfqSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Process', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function RfqSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="RFQ Search"
      menus={MENUS}
      toolbar={['open', 'print', { name: 'mail', muted: true }, 'find']}
      pagination
      sections={RFQ_SECTIONS}
      columns={RFQ_COLUMNS}
      secondaryColumns={RFQ_LINE_ITEM_COLUMNS}
      panelWidth="44%"
    />
  )
}
