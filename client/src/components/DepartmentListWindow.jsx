import DescriptionListWindow from './DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'abbreviation', label: 'Abbreviation', width: '30%' },
  { key: 'description', label: 'Description' },
]

const ROWS = [
  { abbreviation: 'CAT', description: 'CATERING DEPARTMENT' },
  { abbreviation: 'CLAS', description: 'CLASS' },
  { abbreviation: 'DK', description: 'DECK' },
  { abbreviation: 'DKE', description: 'DECK & ENGINE' },
  { abbreviation: 'DRTR', description: 'DRILLS & TRAINING' },
  { abbreviation: 'EL', description: 'ELECRICAL' },
  { abbreviation: 'ER', description: 'ENGINE' },
  { abbreviation: 'HQT', description: 'HEAD OFFICE - TECHNICAL' },
  { abbreviation: 'HSQE', description: 'HEALTH, SAFETY & ENVIRONM' },
  { abbreviation: 'QUAL', description: 'QUALITY' },
]

export default function DepartmentListWindow(props) {
  return <DescriptionListWindow {...props} title="Department List" columns={COLUMNS} rows={ROWS} />
}
