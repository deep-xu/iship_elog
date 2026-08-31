export const RECONCILIATION_SEARCH_COLUMNS = [
  { label: '', width: 30 },
  { label: 'ID', width: 130 },
  { label: 'Date Time', width: 180 },
  { label: 'Created', width: 190 },
  { label: 'Remarks', width: 360 },
]

export const RECONCILIATION_SEARCH_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Status', chevron: true },
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'Item Category', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [{ label: 'Created', value: '-- Select --', muted: true, chevron: true }],
  },
  {
    title: 'Miscellaneous',
    fields: [],
  },
]
