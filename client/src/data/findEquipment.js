export const FIND_EQUIPMENT_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Equipment Code' },
      { label: 'Complete Name' },
      { label: 'Maintained Part', checkbox: true, checked: true },
      { label: 'Maintained Part Name' },
      { label: 'Keyword' },
      { label: 'Inventory On Hand', checkbox: true },
      { label: 'Barcode' },
      { label: 'Identify Equipment As', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Particulars',
    fields: [
      { label: 'Manuf. By Company', checkbox: true, checked: true },
      { label: 'Manufacturer', value: '-- Select --', muted: true, chevron: true },
      { label: 'Source', value: '-- Select --', muted: true, chevron: true },
      { label: 'Model' },
      { label: 'Type' },
      { label: 'Serial No.' },
      { label: 'Size' },
      { label: 'Location' },
      { label: 'Software Version' },
      { label: 'Equipment Criticality', chevron: true },
      { label: 'Vendor Restriction', checkbox: true },
      { label: 'Serialized Item Required', checkbox: true },
      { label: 'Serialized Item Reference', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Index Term',
    fields: [
      { label: 'Equipment Index', value: '-- Select --', muted: true, chevron: true },
      { label: 'Subject Index', value: '-- Select --', muted: true, chevron: true },
      { label: 'Failure Class', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'CM Equipment Only', checkbox: true },
      { label: 'Monitoring Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'Class Eqpt Only', checkbox: true },
      { label: 'Eq Class Name' },
      { label: 'Eq Class Code' },
    ],
  },
]

export const FIND_EQUIPMENT_TOP_COLUMNS = [
  { label: 'S...', width: 42 },
  { label: '...', width: 44 },
  { label: 'Equi...', width: 72 },
  { label: 'C...', width: 52 },
  { label: 'Man...', width: 72 },
  { label: 'M...', width: 52 },
  { label: 'E...', width: 50 },
  { label: 'Lo...', width: 56 },
  { label: 'Cl...', width: 50 },
  { label: 'Fa...', width: 50 },
  { label: 'Cl...', width: 50 },
  { label: '...', width: 42 },
  { label: 'SI...', width: 54 },
  { label: 'C...', width: 52 },
]

export const FIND_EQUIPMENT_BOTTOM_COLUMNS = [
  { label: 'HCS', width: 56 },
  { label: 'Maintaine...', width: 128 },
  { label: 'Main...', width: 86 },
  { label: 'Seria...', width: 88 },
  { label: 'Class...', width: 86 },
  { label: 'Class...', width: 88 },
  { label: 'SI Req', width: 82 },
  { label: 'SI Re...', width: 84 },
  { label: 'Criti...', width: 84 },
]
