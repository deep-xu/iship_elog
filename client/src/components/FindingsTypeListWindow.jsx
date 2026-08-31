import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = ['CLASS FINDINGS', 'Major Non Conformity', 'Non Conformity', 'Observation']

export default function FindingsTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Findings Type List" rows={ROWS} />
}
