import QueryWindow from './QueryWindow.jsx'
import {
  VESSEL_CERTIFICATE_COLUMNS,
  VESSEL_CERTIFICATE_SECTIONS,
} from '../data/vesselCertificateList.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function VesselCertificateListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Vessel Certificate List"
      menus={MENUS}
      toolbar={['print']}
      sections={VESSEL_CERTIFICATE_SECTIONS}
      columns={VESSEL_CERTIFICATE_COLUMNS}
      panelWidth="42%"
    />
  )
}
