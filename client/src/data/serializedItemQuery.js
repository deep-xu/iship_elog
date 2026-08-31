export const SERIALIZED_ITEM_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Ship', width: 86 },
  { label: 'SI Reference', width: 172 },
  { label: 'Serial No.', width: 160 },
  { label: 'Name', width: 260 },
]

export const SERIALIZED_ITEM_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Item Type', chevron: true },
      { label: 'Installed/Removed', chevron: true },
      { label: 'Status', chevron: true },
      { label: 'Serial No.' },
      {
        label: 'Manufacturer',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Description',
    fields: [
      { label: 'Options', chevron: true },
      { label: 'Find whole words only', checkbox: true },
      { label: 'Search String' },
    ],
  },
  {
    title: 'Indexes',
    fields: [
      { label: 'SI Reference', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Repair Status',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Condition', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Global Part Criticality',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Ship Part Criticality',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Subject Index',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      {
        label: 'Expiry Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Mooring',
    fields: [
      {
        label: 'Mooring Line Type',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Certificate No.' },
      { label: 'Position', value: '-- Select --', muted: true, chevron: true },
      { label: 'Lead', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Max Hours of Use',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Max Number of Uses',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Last Inspected Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Received on Board',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Value', value: '-- Select --', muted: true, chevron: true },
      { label: 'Model' },
      { label: 'Type' },
      { label: 'Size' },
      { label: 'Year Made' },
      { label: 'Equipment Criticality', chevron: true },
      { label: 'Vendor', value: '-- Select --', muted: true, chevron: true },
    ],
  },
]
