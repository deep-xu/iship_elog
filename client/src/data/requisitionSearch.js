export const REQUISITION_SEARCH_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Req. No.', width: 132 },
  { label: 'Pri', width: 52 },
  { label: 'Created', width: 120 },
  { label: 'Authorized', width: 136 },
  { label: 'Reviewed', width: 132 },
  { label: 'Eq...', width: 110 },
]

export const REQUISITION_SEARCH_SECONDARY_COLUMNS = [
  { label: 'Itm', width: 42 },
  { label: 'Type', width: 62 },
  { label: 'Part Name', width: 160 },
  { label: 'Part Number', width: 138 },
  { label: 'Sta...', width: 74 },
  { label: 'Document', width: 112 },
  { label: 'Material C...', width: 136 },
  { label: 'Qty', width: 78 },
  { label: 'Unit', width: 74 },
]

export const REQUISITION_SEARCH_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
      { label: 'Priority', chevron: true },
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'Account', value: '-- Select --', muted: true, chevron: true },
      { label: 'Project', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Insurance Claim',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Cost Center',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'WBS', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Item Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Requisition',
    fields: [
      { label: 'Status', chevron: true },
      { label: 'Ready To Be Authorized', checkbox: true },
      { label: 'Ready To Be Reviewed', checkbox: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Needed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Reviewed', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: "Ship's Req.No." },
      {
        label: 'Sugg. Vendor',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Port', value: '-- Select --', muted: true, chevron: true },
      { label: 'Department', value: '-- Select --', muted: true, chevron: true },
      { label: 'Critical Parts Only', checkbox: true },
      { label: 'Template', checkbox: true },
      { label: 'Hazardous Material', checkbox: true },
      { label: 'Owner', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Exported via Purch. Intf.',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Acknowledged in External System',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'External ID' },
    ],
  },
]
