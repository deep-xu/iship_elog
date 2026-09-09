import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  '',
  'Account Manag',
  'Accounting',
  'Daily Report Recipient',
  'MAIN',
  'Manager',
  'Mr.',
  'Mrs.',
  'Ms.',
  'Sales Represe',
  'Secondary',
  'Spares & Serv',
  'TITLE_INDXTRM',
  'Technical',
  'Vice President',
  'zSelect 24/7 - Emergency',
]

export default function ContactTitleListWindow(props) {
  return <DescriptionListWindow {...props} title="Contact Title List" rows={ROWS} />
}
