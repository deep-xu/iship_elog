import LibraryTreeWindow from './LibraryTreeWindow.jsx'

const ITEMS = [
  'Annual Services',
  { label: 'Check/Inspect/Verify', children: ['z'] },
  'Conversion',
  { label: 'Drydock', children: ['Blank', 'Blank1', 'Blank2'] },
  'Fleet Stock Usage',
  {
    label: 'Guarantee Claims',
    children: ['13700 HHI', '13700 NSY- Hiroshima', '13700 NSY- Marugame'],
  },
  'Installation - New/Major',
  { label: 'Instructions', children: ['Software Update'] },
  'Insurance - Cargo related',
  'Insurance - Collision',
  'Insurance - Fire',
  'Insurance - Grounding',
  { label: 'Insurance Claims/Accident', children: ['Blank'] },
  'Inventory',
  'Layup - Hot/Cold',
  'Modification/Upgrade',
  'Name Change',
  'New Building Delivery',
  'New Ship Spares',
  'Notice of Damage (OP033)',
  'Out of ManagementContract',
  'Purchase - Bulk Orders',
  'Purchase - LubsTrack/Bulk',
  'Purchase - Tracking',
  'Recycling of old PCs',
  'Regulatory Compliance',
  'Repairs',
  'Repairs- Voyage/Anchorage',
  'Sale & Purchase of ship',
  'Software Update',
  'Tank Cleaning',
]

export default function ProjectIndexWindow(props) {
  return <LibraryTreeWindow {...props} title="Project Index" items={ITEMS} />
}
