import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = []

export default function WorkCertificateCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="Work Certificate Category List" rows={ROWS} />
}
