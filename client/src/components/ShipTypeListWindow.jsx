import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  'Cont  8,000 - 10,000 TEU',
  'Cont 1,000 -  2,000 TEU',
  'Cont 10,000 - 14,000 TEU',
  'Cont 100 - 1,000 TEU',
  'Cont 13000+ TEU',
  'Cont 15000+ TEU',
  'Cont 2,000- 3,000 TEU',
  'Cont 3,000 - 4,000 TEU',
  'Cont 4,000 - 5,000 TEU',
  'Cont 5,000 - 6,000 TEU',
  'Cont 6,000 - 8,000 TEU',
  'Container - 2500 TEU',
  'Container Ro - Ro',
]

export default function ShipTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Ship Type List" rows={ROWS} />
}
