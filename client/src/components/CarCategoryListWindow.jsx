import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = []

export default function CarCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="CAR Category List" rows={ROWS} />
}
