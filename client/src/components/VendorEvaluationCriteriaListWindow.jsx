import DescriptionListWindow from './DescriptionListWindow.jsx'

const COLUMNS = [
  { key: 'code', label: 'Code', align: 'right', width: '30%' },
  { key: 'description', label: 'Description' },
]

const ROWS = [
  { code: '10', description: 'Credit for Lost/Dam Stock' },
  { code: '3', description: 'Delivery-Proces/Timelines' },
  { code: '4', description: 'EnvironmentalAwareness' },
  { code: '7', description: 'Extra Stock/s Added' },
  { code: '5', description: 'HSQ compliance(PPE use)' },
  { code: '2', description: 'Personnel - Attitude' },
  { code: '1', description: 'Quality - Product/Service' },
  { code: '9', description: 'Stock Reached but Damaged' },
  { code: '6', description: 'Stock/s Left Behind' },
  { code: '8', description: 'Stock/s Lost by Carrier' },
]

export default function VendorEvaluationCriteriaListWindow(props) {
  return (
    <DescriptionListWindow {...props}
      title="Vendor Evaluation Criteria List"
      columns={COLUMNS}
      rows={ROWS}
    />
  )
}
