import QueryWindow from './QueryWindow.jsx'
import { COMPANY_SECTIONS, COMPANY_COLUMNS } from '../data/companiesList.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function CompaniesListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Companies List"
      menus={MENUS}
      toolbar={['open', 'find']}
      sections={COMPANY_SECTIONS}
      columns={COMPANY_COLUMNS}
      panelWidth="42%"
    />
  )
}
