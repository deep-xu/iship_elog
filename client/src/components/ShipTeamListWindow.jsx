import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = ['No', 'Yes']

export default function ShipTeamListWindow(props) {
  return <DescriptionListWindow {...props} title="Ship Team List" rows={ROWS} />
}
