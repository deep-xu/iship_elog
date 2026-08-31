import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  '10 - Rectified',
  '15 - Rectify Next Port',
  '16 - Rectify in14 Days',
  '17-Rectify before sailing',
  '18 - Rectify in 3 Months',
  '20 - Ship Expelled',
  '25 - Ship Denied Entry',
  '30 - Detainable',
  '40 - Rectify in 7 Days',
  '50 - Rectify in 30 Days',
  '60-RectifyBefore Movement',
  '70-Informed organisation',
  '99 - Other(text) - Tokoyo',
  'Do Not Use,Except for PSC',
  'DoNott Use',
]

export default function CarInternalReferenceOneListWindow(props) {
  return <DescriptionListWindow {...props} title="CAR Internal Reference One List" rows={ROWS} />
}
