import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'abbreviation', label: 'Abbreviation', width: '30%' },
  { key: 'description', label: 'Description' },
]

const ROWS = [{ abbreviation: '', description: 'Chemical' }]

export default function HazardCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="Hazard Category List" columns={COLUMNS} rows={ROWS} />
}
