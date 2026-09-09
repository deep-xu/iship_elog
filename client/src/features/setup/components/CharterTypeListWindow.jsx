import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'abbreviation', label: 'Abbreviation', width: '30%' },
  { key: 'description', label: 'Description' },
]

export default function CharterTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Charter Type List" columns={COLUMNS} rows={[]} />
}
