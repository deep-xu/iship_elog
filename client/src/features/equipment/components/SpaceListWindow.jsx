import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { SPACE_COLUMNS, SPACE_SECTIONS } from '@/data/spaceList.js'

const MENUS = [
  { label: 'Space', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function SpaceListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Space Lists"
      menus={MENUS}
      toolbar={['open', 'refresh', 'archive', 'find']}
      sections={SPACE_SECTIONS}
      columns={SPACE_COLUMNS}
      panelWidth="42%"
    />
  )
}
