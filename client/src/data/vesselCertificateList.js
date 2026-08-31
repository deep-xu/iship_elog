export const VESSEL_CERTIFICATE_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Certificate Name' },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Issue Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'Expiry Date', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Certificate Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'Job Type', chevron: true },
      { label: 'Issuing Authority', value: '-- Select --', muted: true, chevron: true },
      { label: 'Reviewed Status', chevron: true },
      { label: 'Retired', checkbox: true },
      { label: 'Expired Only', checkbox: true },
      { label: 'E-Certificate', checkbox: true },
    ],
  },
]

export const VESSEL_CERTIFICATE_COLUMNS = [
  { label: '', width: 28 },
  { label: 'Name', width: 160 },
  { label: 'Type', width: 82 },
  { label: 'Co...', width: 58 },
  { label: 'E-...', width: 58 },
  { label: 'Certifica...', width: 114 },
  { label: 'Inter...', width: 88 },
  { label: 'Issue...', width: 84 },
  { label: 'Ex...', width: 58 },
  { label: 'Du...', width: 58 },
  { label: 'Re...', width: 58 },
]
