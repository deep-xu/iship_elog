import LibraryTreeWindow from '@/features/setup/components/LibraryTreeWindow.jsx'

const ITEMS = [
  'Ballast Water Management',
  'Bridge Procedures Guide',
  'COSWP',
  'Cargo Securing Manual',
  'Flag State Ordinance',
  'GMDSS',
  'Garbage Management Plan',
  'HKC & EU SRR',
  'Hull Inspection Manual',
  'IGF Code',
  'IMDG Code',
  'ISO 14001',
  'ISO9001',
  'ISPS Code',
  'MARPOL',
  'MLC-Maritime Labour Conv.',
  { label: 'SEEMP', children: ['ISPS'] },
  'SOLAS',
  'STCW',
  'US CFR/EPA/Sea Carrier',
  'Vessel General Permit',
]

export default function StandardReferenceWindow(props) {
  return <LibraryTreeWindow {...props} title="Standard Reference" items={ITEMS} showIcons={false} />
}
