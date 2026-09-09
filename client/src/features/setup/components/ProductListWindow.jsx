import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  'Bilge Water/Oil mix',
  'Cargo',
  'Chemical',
  'Garbage',
  'HFO',
  'MDO',
  'OIL- Lubricating',
  'Other',
  'Paint',
  'Sewage',
  'Sludge',
  'VLSFO',
]

export default function ProductListWindow(props) {
  return <DescriptionListWindow {...props} title="Product List" rows={ROWS} />
}
