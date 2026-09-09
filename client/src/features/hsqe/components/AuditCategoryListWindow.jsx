import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = ['Follow Up', 'Initial', 'Scheduled', 'Unscheduled']

export default function AuditCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="Audit Category List" rows={ROWS} />
}
