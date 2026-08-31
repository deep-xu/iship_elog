import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  'MAJOR NON CONFORMITY',
  'MOC',
  'NON CONFORMITY',
  'NON CONFORMITY REPEATED',
  'OBSERVATIONS',
  'PSC - DEFICIENCY',
  'RECOMMENDATION',
  'SIGNIFICANT INCIDENT',
  'THIRD PARTY - DEFICIENCY',
]

export default function CarTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="CAR Type List" rows={ROWS} />
}
