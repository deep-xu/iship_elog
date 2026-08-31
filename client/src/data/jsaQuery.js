export const JSA_QUERY_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Completed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Closed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Approved', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Current Status',
    fields: [],
  },
  {
    title: 'Miscellaneous',
    fields: [],
  },
]

export const JSA_QUERY_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'No.', width: 58 },
  { label: 'Type', width: 86 },
  { label: 'Status', width: 96 },
  { label: 'Created/...', width: 112 },
  { label: 'Created ...', width: 112 },
  { label: 'JSA Ty...', width: 92 },
  { label: 'JSA Ca...', width: 92 },
  { label: 'Title', width: 144 },
  { label: 'Last Updat...', width: 128 },
]
