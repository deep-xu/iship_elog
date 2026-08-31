export const CONTRACT_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'Service Type', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Contract',
    fields: [
      { label: 'Type', chevron: true },
      { label: 'Vendor', value: '-- Select --', muted: true, chevron: true },
      { label: 'Status', chevron: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Approved', value: '-- Select --', muted: true, chevron: true },
      { label: 'Valid From', value: '-- Select --', muted: true, chevron: true },
      { label: 'Valid To', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Title' },
      { label: 'Zone Currency', value: '-- Select --', muted: true, chevron: true },
      { label: 'Responsible', value: '-- Select --', muted: true, chevron: true },
      { label: 'Total Value', value: '-- Select --', muted: true, chevron: true },
      { label: "I'm the approver", checkbox: true },
      { label: 'Hazardous Material', checkbox: true },
      { label: 'Approved On-board', checkbox: true },
    ],
  },
]

export const CONTRACT_COLUMNS = [
  { label: '', width: 30 },
  { label: '', width: 30 },
  { label: 'Con...', width: 72 },
  { label: 'T...', width: 40 },
  { label: 'Title', width: 120 },
  { label: 'Sta...', width: 60 },
  { label: 'Crea...', width: 68 },
  { label: 'Appr...', width: 68 },
  { label: 'Resp...', width: 68 },
  { label: 'Valid...', width: 68 },
  { label: 'Valid...', width: 68 },
  { label: 'Vendor', width: 120 },
  { label: 'Total...', width: 92 },
  { label: 'Haz...', width: 58 },
]

export const CONTRACT_SECONDARY_COLUMNS = [
  { label: 'Type', width: 150 },
  { label: 'Equipment/Service Type', width: 330 },
  { label: 'Part/Service Name', width: 340 },
]

export const CONTRACT_TERTIARY_COLUMNS = [
  { label: 'Revision', width: 160 },
  { label: 'Approved', width: 220 },
  { label: 'Person', width: 260 },
]
