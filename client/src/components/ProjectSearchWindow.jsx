import QueryWindow from './QueryWindow.jsx'
import { PROJECT_COLUMNS, PROJECT_SECTIONS } from '../data/projectSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function ProjectSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Projects List"
      menus={MENUS}
      toolbar={['print', 'find']}
      sections={PROJECT_SECTIONS}
      columns={PROJECT_COLUMNS}
      panelWidth="39%"
    />
  )
}
