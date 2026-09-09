import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  'Anti-splash suit',
  'Autoclave gloves',
  'Chemical Gloves',
  'Cutting Goggles',
  'Ear Protection',
  'Face Shield',
  'Fall Arrester',
  'HV work rubber mats',
  'High Visibility Vests',
  'High Voltage Gloves',
  'Hose Protection (500 Bar)',
  'Insulating Hard Hat',
  'Rescue Harness',
  'Rescue Pole',
  'Respirator / Face Mask',
  'Safety Apron',
  'Safety Boots (500 Bar)',
  'Safety Goggles',
  'Safety Harness',
  'Safety Helmet',
  'Safety Helmet cw Visor',
  'Safety Shoes',
  'Safety Suit  (500 Bar)',
  'UV Protection goggles',
  'WP Gloves (500 Bar)',
  'Welding Apron',
  'Welding Gloves',
  'Welding Shield',
  'Work Vest with AIS',
  'Working Gloves',
]

export default function PpeListWindow(props) {
  return <DescriptionListWindow {...props} title="PPE List" rows={ROWS} selectedIndex={4} />
}
