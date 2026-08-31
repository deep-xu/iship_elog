import DescriptionListWindow from './DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'abbreviation', label: 'Abbreviation', width: '20%' },
  { key: 'description', label: 'Description' },
  { key: 'vettingInspectingCompany', label: 'Vetting Inspecting Company', width: '30%' },
]

const ROWS = []

export default function ExternalInspectorsListWindow(props) {
  return (
    <DescriptionListWindow {...props} title="External Inspectors List" columns={COLUMNS} rows={ROWS} />
  )
}
