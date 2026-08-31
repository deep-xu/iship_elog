// Companies List search panel definition.

export const COMPANY_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Company Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'Vendor Code' },
      { label: 'Company Name' },
      { label: 'Ship-To Location Code' },
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'City, Country', value: '-- Select --', muted: true, chevron: true },
      { label: 'Rank', chevron: true },
      { label: 'Vendor Filtration Category', value: '-- Select --', muted: true, chevron: true },
      { label: 'Procurement Method', chevron: true },
      { label: 'Company Code' },
      { label: 'Address Code' },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { spacer: true },
      { label: 'Applicable Currencies', value: '-- Select --', muted: true, chevron: true },
    ],
  },
]

export const COMPANY_COLUMNS = [
  { label: '', width: 30 },
  { label: 'Compan...', width: 108 },
  { label: 'Ven...', width: 66 },
  { label: 'Com...', width: 66 },
  { label: 'Add...', width: 66 },
  { label: 'R...', width: 44 },
  { label: 'City, Cou...', width: 112 },
  { label: 'Address', width: 112 },
  { label: 'Type', width: 62 },
  { label: 'Appl...', width: 66 },
]
