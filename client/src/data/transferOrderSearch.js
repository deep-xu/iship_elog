export const TRANSFER_ORDER_SEARCH_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Des...', width: 84 },
  { label: 'TO ...', width: 82 },
  { label: 'Equipment', width: 172 },
  { label: 'Fisc...', width: 78 },
  { label: 'Del...', width: 64 },
  { label: 'Am...', width: 72 },
  { label: 'Del...', width: 64 },
  { label: 'Requisi...', width: 116 },
  { label: 'Haz', width: 54 },
]

export const TRANSFER_ORDER_SEARCH_SECONDARY_COLUMNS = [
  { label: 'Itm', width: 42 },
  { label: 'Ty...', width: 46 },
  { label: 'Source Part Name', width: 184 },
  { label: 'Unit ...', width: 92 },
  { label: 'Qty', width: 78 },
  { label: 'Unit', width: 74 },
  { label: 'Ty...', width: 46 },
  { label: 'Destination Part ...', width: 210 },
]

export const TRANSFER_ORDER_SEARCH_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'Account', value: '-- Select --', muted: true, chevron: true },
      { label: 'Project', value: '-- Select --', muted: true, chevron: true },
      { label: 'Source Ship', value: '-- Select --', muted: true, chevron: true },
      { label: 'Destination Ship', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Transfer Order',
    fields: [{ label: 'Status', chevron: true }],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Issue Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'Shipped Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'Deliv. Date', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Fiscal Effective Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Expected Delivery', value: '-- Select --', muted: true, chevron: true },
      { label: 'Expedite', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Hazardous Material', checkbox: true },
      { label: 'Supplier', value: '-- Select --', muted: true, chevron: true },
      { label: 'Department', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ship Via', value: '-- Select --', muted: true, chevron: true },
    ],
  },
]
