import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  'Accidentally open valve',
  'Damaged Barrel/Drum',
  'Equipment Damage',
  'Flange leak',
  'Fuel regulator stuck',
  'Hull Damage',
  'Mechanical seal',
  'Overflow',
  'Pressure gauge Tapping',
  'Seal leakage',
  'Unlawful Discharge',
]

export default function SpillTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Spill Type List" rows={ROWS} />
}
