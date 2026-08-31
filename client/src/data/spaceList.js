export const SPACE_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Ship', width: 90 },
  { label: 'Space Name', width: 260 },
  { label: 'Area', width: 110 },
  { label: 'Capacity', width: 100 },
  { label: 'Space Index', width: 140 },
]

export const SPACE_SECTIONS = [
  {
    title: 'Indexes',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      {
        label: 'Space Index',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [{ label: 'Account', value: '-- Select --', muted: true, chevron: true }],
  },
]
