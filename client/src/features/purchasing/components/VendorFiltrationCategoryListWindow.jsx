import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'abbreviation', label: 'Abbreviation', width: '30%' },
  { key: 'description', label: 'Description' },
]

const ROWS = [
  { abbreviation: '', description: 'Chandlery' },
  { abbreviation: '', description: 'SCMIPL' },
  { abbreviation: '', description: 'Sales & Service' },
]

export default function VendorFiltrationCategoryListWindow(props) {
  return (
    <DescriptionListWindow {...props}
      title="Vendor Filtration Category List"
      columns={COLUMNS}
      rows={ROWS}
    />
  )
}
