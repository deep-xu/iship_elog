import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  '0: Near Miss',
  '0: Near Miss – Unsafe Act',
  '0: Near Miss – Unsafe Condition',
  '1: Slight',
  '2 : Minor',
  '3 : Medium',
  '4 : Major',
  '5 : Extreme',
]

export default function IncidentCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="Incident Category List" rows={ROWS} />
}
