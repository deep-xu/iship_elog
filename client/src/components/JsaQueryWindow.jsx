import QueryWindow from './QueryWindow.jsx'
import { JSA_QUERY_COLUMNS, JSA_QUERY_SECTIONS } from '../data/jsaQuery.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'View', accel: 3 },
  { label: 'Help', accel: 0 },
]

export default function JsaQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="JSA Query"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find', 'refresh']}
      sections={JSA_QUERY_SECTIONS}
      columns={JSA_QUERY_COLUMNS}
      panelWidth="31%"
    />
  )
}
