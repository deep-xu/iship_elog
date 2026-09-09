import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = []

export default function CarCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="CAR Category List" rows={ROWS} />
}
