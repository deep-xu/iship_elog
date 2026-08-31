import QueryWindow from './QueryWindow.jsx'
import {
  RECONCILIATION_SEARCH_COLUMNS,
  RECONCILIATION_SEARCH_SECTIONS,
} from '../data/reconciliationSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function ReconciliationSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Reconciliation Search"
      menus={MENUS}
      toolbar={['new', 'open', 'print']}
      sections={RECONCILIATION_SEARCH_SECTIONS}
      columns={RECONCILIATION_SEARCH_COLUMNS}
      pagination
      panelWidth="35%"
    />
  )
}
