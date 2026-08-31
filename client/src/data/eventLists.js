export const EVENT_LISTS_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Event No.' },
      { label: 'Since', value: '-- Select --', muted: true, chevron: true },
      { label: 'Until', value: '-- Select --', muted: true, chevron: true },
      { label: 'Event Index', value: '-- Select --', muted: true, chevron: true },
      { label: 'Event Name' },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [],
  },
]

export const EVENT_LISTS_COLUMNS = [
  { label: 'Start Date', width: 110 },
  { label: 'Port', width: 110 },
  { label: 'Event Name', width: 180 },
  { label: 'No. of Days', width: 110 },
  { label: 'No. of Jobs', width: 110 },
]
