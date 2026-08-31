import DescriptionListWindow from './DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'code', label: 'Code', align: 'right', width: '30%' },
  { key: 'description', label: 'Description' },
]

const ROWS = [
  { code: '0', description: 'Fleet A1' },
  { code: '0', description: 'Fleet A2' },
  { code: '0', description: 'Fleet B1' },
]

export default function ShipFleetTradeListWindow(props) {
  return <DescriptionListWindow {...props} title="Ship Fleet/Trade List" columns={COLUMNS} rows={ROWS} />
}
