export const STRUCTURE_COLUMNS = [
  { label: '', width: 28 },
  { label: 'Ship', width: 90 },
  { label: 'Structure Name', width: 280 },
  { label: 'Area', width: 120 },
]

export const STRUCTURE_SECTIONS = [
  {
    title: 'Indexes',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      {
        label: 'Structure Index',
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
