import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  CONTRACT_COLUMNS,
  CONTRACT_SECONDARY_COLUMNS,
  CONTRACT_SECTIONS,
  CONTRACT_TERTIARY_COLUMNS,
} from '@/data/contractSearch.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function ContractSearchWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Contract Search"
      menus={MENUS}
      toolbar={['open', 'print', 'find']}
      sections={CONTRACT_SECTIONS}
      columns={CONTRACT_COLUMNS}
      secondaryColumns={CONTRACT_SECONDARY_COLUMNS}
      tertiaryColumns={CONTRACT_TERTIARY_COLUMNS}
      pagination
      panelWidth="44%"
    />
  )
}
