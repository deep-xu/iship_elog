// CAR (Corrective Action) Query search panel definition.

export const QUERY_SECTIONS = [
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
      { label: 'Reported', value: '-- Select --', muted: true, chevron: true },
      { label: 'Proposed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Verified', value: '-- Select --', muted: true, chevron: true },
      { label: 'Corrected', value: '-- Select --', muted: true, chevron: true },
      { label: 'Closed', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Current Status',
    fields: [{ label: 'Status', chevron: true }],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Document Origin', chevron: true },
      { label: 'Source', chevron: true },
      { label: 'Compliance Hierarchy', value: '-- Select --', muted: true, chevron: true },
      { label: 'Department', value: '-- Select --', muted: true, chevron: true },
      { label: 'CAR Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'CAR Category', value: '-- Select --', muted: true, chevron: true },
      { label: 'Responsible', value: '-- Select --', muted: true, chevron: true },
      { label: 'SMM Ref.', value: '-- Select --', muted: true, chevron: true },
      { label: 'Standard Ref.', value: '-- Select --', muted: true, chevron: true },
      { label: 'PSC Deficiency Code', value: '-- Select --', muted: true, chevron: true },
      { label: 'RCA Level 4', value: '-- Select --', muted: true, chevron: true },
      { label: 'Root Cause', value: '-- Select --', muted: true, chevron: true },
      { label: 'Vendor Written Against', value: '-- Select --', muted: true, chevron: true },
      { label: 'ISM', checkbox: true },
      { label: 'ISPS', checkbox: true },
      { label: 'TSMS', checkbox: true },
      { label: 'Raised By', chevron: true },
      { label: 'Overdue Only', checkbox: true },
    ],
  },
]

export const RESULT_COLUMNS = [
  { label: '', width: 26 },
  { label: '', width: 26 },
  { label: 'No.', width: 52 },
  { label: 'Title', width: 120 },
  { label: 'T...', width: 44 },
  { label: 'Cla...', width: 52 },
  { label: 'Cre...', width: 52 },
  { label: 'Sta...', width: 52 },
  { label: 'By', width: 44 },
  { label: 'Cor...', width: 52 },
  { label: 'Doc...', width: 52 },
  { label: 'So...', width: 48 },
  { label: 'Fi...', width: 44 },
  { label: 'Fi...', width: 44 },
]
