import QueryWindow from './QueryWindow.jsx'
import {
  PERMIT_TO_WORK_LIST_COLUMNS,
  PERMIT_TO_WORK_LIST_SECTIONS,
} from '../data/permitToWorkList.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function PermitToWorkListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Permit to Work List"
      menus={MENUS}
      toolbar={['new', 'open', 'print']}
      sections={PERMIT_TO_WORK_LIST_SECTIONS}
      columns={PERMIT_TO_WORK_LIST_COLUMNS}
      panelWidth="42%"
    />
  )
}
