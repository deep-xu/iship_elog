export const FIND_PART_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Part No.' },
      { label: 'Part No Ref.' },
      { label: 'PIN No.' },
      { label: 'MARAD No.' },
      { label: 'IMO No.' },
      { label: 'NS ID', checkbox: true },
      { label: '', value: '000-00000-00000000' },
      { label: 'Barcode' },
      { label: 'Ignore Punctuation', checkbox: true },
      { label: 'Inventory On Hand', checkbox: true },
      { label: 'On-Order', checkbox: true },
    ],
  },
  {
    title: 'Description',
    fields: [
      { label: 'Options', value: 'All these words', chevron: true },
      { label: 'Find whole words only', checkbox: true },
      { label: 'Search String' },
    ],
  },
  {
    title: 'Index Terms',
    fields: [
      { label: 'Include Critical Parts Only', checkbox: true },
      { label: 'Global Part Criticality', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ship Part Criticality', value: '-- Select --', muted: true, chevron: true },
      { label: 'Interchangeability Term', value: '-- Select --', muted: true, chevron: true },
      { label: 'Item Category', value: '-- Select --', muted: true, chevron: true },
      { label: 'Serialized Item Reference', value: '-- Select --', muted: true, chevron: true },
      { label: 'Serialized Parts', checkbox: true },
      { label: 'Mooring Line Type', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Hazardous Material',
    fields: [
      { label: 'Part Attributes', value: '-- Select --', muted: true, chevron: true },
      { label: 'Hazard Class', value: '-- Select --', muted: true, chevron: true },
      { label: 'UN Hazard Code', value: '-- Select --', muted: true, chevron: true },
      { label: 'IHM Hazard Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'Hazardous Material', checkbox: true },
    ],
  },
  {
    title: 'Policy Levels',
    fields: [
      { label: 'Maximum', value: '-- Select --', muted: true, chevron: true },
      { label: 'Minimum', value: '-- Select --', muted: true, chevron: true },
      { label: 'Reorder', value: '-- Select --', muted: true, chevron: true },
      { label: 'On Hand Qty Below Max', checkbox: true },
      { label: 'On Hand Qty Below Min', checkbox: true },
      { label: 'On Hand Qty Below Reorder', checkbox: true },
    ],
  },
  {
    title: 'Mooring',
    fields: [
      { label: 'WLL', value: '-- Select --', muted: true, chevron: true },
      { label: 'Original Length', value: '-- Select --', muted: true, chevron: true },
      { label: 'Original Diameter', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Manufacturer Recommended', checkbox: true },
      { label: 'Warehoused', checkbox: true },
      { label: 'Subject To Customs', checkbox: true },
      { label: 'Stocked', checkbox: true },
    ],
  },
]

export const FIND_PART_COLUMNS = [
  { label: '...', width: 38 },
  { label: 'E...', width: 44 },
  { label: '...', width: 38 },
  { label: 'Par...', width: 64 },
  { label: 'Pa...', width: 58 },
  { label: 'PI...', width: 50 },
  { label: 'O...', width: 44 },
  { label: 'L...', width: 44 },
  { label: 'It...', width: 44 },
  { label: 'P...', width: 44 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
  { label: '...', width: 38 },
]
