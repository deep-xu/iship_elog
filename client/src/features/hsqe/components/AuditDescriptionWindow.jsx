import LibraryTreeWindow from '@/features/setup/components/LibraryTreeWindow.jsx'

const ITEMS = [
  'General',
  'Internal ISM/MLC/ISO 9K 14K 45K',
  'Internal ISPS',
  'Internal ISPS-Description',
  "Master's SMS Review",
  "Master's SOPEP Review",
  "Master's SSP Review",
  'NS5 Ship Audit',
]

export default function AuditDescriptionWindow(props) {
  return <LibraryTreeWindow {...props} title="Audit Description (Text)" items={ITEMS} showIcons={false} />
}
