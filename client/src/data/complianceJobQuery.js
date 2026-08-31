// Compliance Job Query search panel definition.

export const QUERY_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Compliance Job Type', chevron: true },
      { label: 'Compliance Index', chevron: true },
    ],
  },
  {
    title: 'Indexes',
    fields: [
      { label: 'Interval Index', value: '-- Select --', muted: true, chevron: true },
      { label: 'Department', value: '-- Select --', muted: true, chevron: true },
      { label: 'Authority', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Status', chevron: true },
      { label: '"Due" Cutoff Dt.', value: '-- Select --', muted: true, chevron: true },
      { label: 'Questionnaire', value: '-- Select --', muted: true, chevron: true },
      { label: 'Interval' },
      { label: 'Interval Unit', chevron: true },
    ],
  },
]

export const RESULT_COLUMNS = [
  { label: 'Com...', width: 60 },
  { label: 'Compl...', width: 64 },
  { label: 'Compl...', width: 64 },
  { label: 'Quest...', width: 60 },
  { label: 'Inspe...', width: 60 },
  { label: 'Int...', width: 48 },
  { label: 'La...', width: 48 },
  { label: 'Sc...', width: 48 },
  { label: 'Op...', width: 48 },
  { label: 'Clo...', width: 48 },
  { label: 'Sta...', width: 48 },
  { label: 'Risk', width: 52 },
]
