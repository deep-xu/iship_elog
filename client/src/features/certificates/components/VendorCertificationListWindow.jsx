import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = ['Company profile']

export default function VendorCertificationListWindow(props) {
  return <DescriptionListWindow {...props} title="Vendor Certification List" rows={ROWS} />
}
