import QueryWindow from './QueryWindow.jsx'
import {
  INSURANCE_CLAIMS_COLUMNS,
  INSURANCE_CLAIMS_SECTIONS,
} from '../data/insuranceClaims.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function InsuranceClaimsListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Insurance Claims List"
      menus={MENUS}
      toolbar={['open', 'print', 'find']}
      sections={INSURANCE_CLAIMS_SECTIONS}
      columns={INSURANCE_CLAIMS_COLUMNS}
      panelWidth="38%"
    />
  )
}
