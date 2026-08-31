import QueryWindow from './QueryWindow.jsx'
import {
  STANDARD_JOB_COLUMNS,
  STANDARD_JOB_ROWS,
  STANDARD_JOB_SECTIONS,
} from '../data/standardJobQuery.js'

const MENUS = [
  { label: 'Standard Job', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function StandardJobQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Standard Job Query"
      menus={MENUS}
      toolbar={['open', 'find']}
      sections={STANDARD_JOB_SECTIONS}
      columns={STANDARD_JOB_COLUMNS}
      rows={STANDARD_JOB_ROWS}
      panelWidth="42%"
    />
  )
}
