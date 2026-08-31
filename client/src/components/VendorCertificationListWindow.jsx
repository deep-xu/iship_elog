import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = ['Company profile']

export default function VendorCertificationListWindow(props) {
  return <DescriptionListWindow {...props} title="Vendor Certification List" rows={ROWS} />
}
