import LibraryTreeWindow from './LibraryTreeWindow.jsx'

const ITEMS = [
  '24h-ShipSafetyInspection',
  'External - ISM/ISO 9K 14K 45K',
  'External - ISPS',
  'External - MLC',
  'External - Navigation',
  'External - PSC',
  'External - VECP',
  {
    label: 'Internal',
    children: [
      'IHM',
      'ISM / MLC / ISO 9K 14K 45K',
      'ISPS',
      'Masters self Navigation audit',
      'Navigation',
      'PMS',
    ],
  },
  { label: "Master's Review", children: ['SMS', 'SOPEP', 'SSP'] },
]

export default function AuditTypeWindow(props) {
  return <LibraryTreeWindow {...props} title="Audit Type" items={ITEMS} showIcons={false} />
}
