export const LANDING_ORDER_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Source Ship', value: 'SBEN', chevron: true },
      { label: 'Source Vendor', value: '-- Select --', muted: true, chevron: true },
      { label: 'Destination Ship', value: '-- Select --', muted: true, chevron: true },
      { label: 'Destination Location', value: '-- Select --', muted: true, chevron: true },
      { label: 'LO No.' },
      { label: 'SI Reference', value: '-- Select --', muted: true, chevron: true },
      { label: 'Authorizer', value: '-- Select --', muted: true, chevron: true },
      { label: 'Approver', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Landing Order',
    fields: [
      { label: 'SI Status', value: '-- Select --', muted: true, chevron: true },
      { label: 'Status', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [],
  },
]

export const LANDING_ORDER_COLUMNS = [
  { label: '', width: 30 },
  { label: '', width: 30 },
  { label: 'LO ...', width: 72 },
  { label: 'Source', width: 118 },
  { label: 'Destinatio...', width: 140 },
  { label: 'Stat...', width: 72 },
  { label: 'Shi...', width: 72 },
  { label: 'Deli...', width: 72 },
  { label: 'LO ...', width: 78 },
  { label: 'Ship To', width: 110 },
  { label: 'Due ...', width: 74 },
]
