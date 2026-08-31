export const ORDER_COLUMNS = [
  { label: 'Ship', width: 160 },
  { label: 'Order No.', width: 180 },
  { label: 'Order Status', width: 180 },
  { label: 'Order Date', width: 170 },
  { label: 'Template Name', width: 190 },
]

export const ORDER_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Order No.' },
      { label: 'Order Status', chevron: true },
      { label: 'Order Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'Priority', chevron: true },
      { label: 'Critical Spares', checkbox: true },
      { label: 'My Order(s)', checkbox: true },
      { label: 'Template', checkbox: true },
    ],
  },
]
