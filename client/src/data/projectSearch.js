export const PROJECT_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Project No.', width: 108 },
  { label: 'Description', width: 176 },
  { label: 'Project Type', width: 108 },
  { label: 'Created', width: 96 },
  { label: 'Task Count', width: 90 },
  { label: 'Claim', width: 90 },
  { label: 'Approved', width: 90 },
  { label: 'Ships', width: 80 },
  { label: 'Budget', width: 90 },
  { label: 'Account', width: 90 },
  { label: 'Parent Project', width: 118 },
]

export const PROJECT_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Project Number' },
      { label: 'Account', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Insurance Claim',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Project',
    fields: [{ label: 'Status', chevron: true }],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      { label: 'Approved', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Completed',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [],
  },
]
