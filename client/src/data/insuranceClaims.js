export const INSURANCE_CLAIMS_COLUMNS = [
  { label: '', width: 28 },
  { label: 'Claim ...', width: 88 },
  { label: 'Claim...', width: 82 },
  { label: 'Settle...', width: 90 },
  { label: 'Claim ...', width: 94 },
  { label: 'Status', width: 148 },
  { label: 'Compa...', width: 92 },
  { label: 'Description', width: 166 },
]

export const INSURANCE_CLAIMS_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Claim Number' },
      { label: 'Vendor', value: '-- Select --', muted: true, chevron: true },
      { label: 'Account', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Closed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Claim Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'Settlement Date', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Current Status',
    fields: [{ label: 'Status', chevron: true }],
  },
  {
    title: 'Miscellaneous',
    fields: [],
  },
]
