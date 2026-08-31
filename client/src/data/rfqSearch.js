export const RFQ_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'RFQ No.', width: 118 },
  { label: 'Title', width: 220 },
  { label: 'Created', width: 108 },
  { label: 'Issued', width: 108 },
]

export const RFQ_LINE_ITEM_COLUMNS = [
  { label: '', width: 28 },
  { label: 'Itm', width: 44 },
  { label: 'Type', width: 60 },
  { label: 'Ship', width: 66 },
  { label: 'Equipment/Title', width: 200 },
  { label: 'Part Name/SR No.', width: 176 },
  { label: 'Doc', width: 64 },
  { label: 'Qty', width: 70 },
  { label: 'Unit', width: 70 },
]

export const RFQ_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
      { label: 'Priority', chevron: true },
      {
        label: 'Equipment',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Account', value: '-- Select --', muted: true, chevron: true },
      { label: 'Project', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Insurance Claim',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Cost Center',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'WBS', value: '-- Select --', muted: true, chevron: true },
      { label: 'Type', chevron: true },
      {
        label: 'Item Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'RFQ',
    fields: [{ label: 'Status', chevron: true }],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Issue Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Quotes Due By',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Pricing Completed',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Deliver By',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Approval Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Quotation Discrepancies',
    fields: [
      { label: 'Line Item UOM Changed', plain: true },
      { label: 'Item Qty different from Original Qty', plain: true },
      { label: 'All Items Not Quoted', plain: true },
      { label: 'Vendor Not Quoted', plain: true },
      { label: 'Vendor Not Responded by Due Date', plain: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Title' },
      { label: 'Contact' },
      {
        label: 'Department',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Vendor', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ship To', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Issued By',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Shipyard RFQ', checkbox: true },
      { label: "I'm the approver", checkbox: true },
      { label: 'Hazardous Material', checkbox: true },
    ],
  },
]
