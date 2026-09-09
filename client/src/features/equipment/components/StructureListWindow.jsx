import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { STRUCTURE_COLUMNS, STRUCTURE_SECTIONS } from '@/data/structureList.js'

const MENUS = [
  { label: 'Structures', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function StructureListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Structure Lists"
      menus={MENUS}
      toolbar={['open', 'refresh', 'archive', 'find']}
      sections={STRUCTURE_SECTIONS}
      columns={STRUCTURE_COLUMNS}
      panelWidth="42%"
    />
  )
}
