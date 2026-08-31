import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = [
  'Anchoring',
  'Anti-piracy',
  'Boiler Water Washing',
  'Bunkering',
  'Cargo Operations',
  'Change Management',
  'Cold Repair',
  'Container lashing',
  'Deploying Emergency Lashing',
  'Enclosed Space Entry',
  'High Voltage System',
  'Hot Work',
  'Hydroblaster',
  'LNG Operations',
  'Lathe Machine',
  'Lifeboat Launching',
  'Lifting Heavy Objects',
  'Load IMDG Class 9 / UN 3480',
  'Machinery Inspection',
  'Machinery Overhaul',
  'Machinery or Electrical Isolation',
  'Mooring / Unmooring',
  'Portable Power Tools',
  'Reefer Plug/Unplug',
  'Rigging Accommodation Ladder / Gangway',
  'Rigging Pilot Ladder',
  'Scavenge Space Inspection',
  'Sludge Discharge',
  'Spray Painting',
  'Underwater Work',
  'Work on High Temperature / Pressure Fluid System',
  'Working Aloft',
  'Working Overside',
  'Working with Chemicals',
]

export default function JsaTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="JSA Type List" rows={ROWS} />
}
