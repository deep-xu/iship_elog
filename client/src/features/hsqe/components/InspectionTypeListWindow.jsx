import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  '2nd Eng - Safety',
  '2nd Off - GMDSS',
  '2nd Off - Medical',
  '2nd Off - Navigation',
  '2nd Off - Purchase order',
  '2nd Off. - GMDSS & Navigation',
  '3rd Eng. - Safety',
  '3rd Off. - Fire Fighting Appliances',
  '3rd Off. - LSA & FFA',
  '3rd Off. - Life Saving Appliances',
  'Accommodation Ladders',
  'Bunker Survey',
  'Campaign',
  'Chief Eng - Safety',
  'Chief Off - Bilge Alarms - Deck',
  'Chief Off - Safety',
  'EMS Checklist',
  'Elect Off - Safety',
  'FMS Review',
  'Flag State Inspection',
  'Health - Safety - Enviornment',
  'Insp-On/Off Hire Survey',
  'Inspection - Class Survey',
  'Inspection- EMS Checklist',
  'Inspection- Third Party',
  'Inspection-Superintendent',
  'LNG specific',
  'PSC - Nil deficiency',
  'PSC - With deficiency',
  'Pilot Ladders',
  "Safety Officer's - Deck",
  "Safety Officer's - Engine",
  "Safety Officer's - General",
  'Smoke Detector - Cargo Hold',
  'VGP',
]

export default function InspectionTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Inspection Type List" rows={ROWS} />
}
