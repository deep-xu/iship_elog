import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { LANDING_ORDER_COLUMNS, LANDING_ORDER_SECTIONS } from '@/data/landingOrderSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function LandingOrderSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Landing Order Search"
      menus={MENUS}
      toolbar={['print', 'find']}
      sections={LANDING_ORDER_SECTIONS}
      columns={LANDING_ORDER_COLUMNS}
      panelWidth="42%"
    />
  )
}
