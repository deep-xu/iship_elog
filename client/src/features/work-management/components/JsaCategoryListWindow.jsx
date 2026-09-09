import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = ['Environmental', 'Operational', 'Safety', 'Security']

export default function JsaCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="JSA Category List" rows={ROWS} />
}
