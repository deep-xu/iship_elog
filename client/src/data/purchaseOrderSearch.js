export const PURCHASE_ORDER_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'PO No.', width: 118 },
  { label: 'T', width: 34 },
  { label: 'Title', width: 176 },
  { label: 'Rdy', width: 54 },
  { label: 'Created', width: 108 },
  { label: 'Approved', width: 118 },
  { label: 'Issued', width: 118 },
]

export const PURCHASE_ORDER_SECONDARY_COLUMNS = [
  { label: 'Itm', width: 42 },
  { label: 'Rev', width: 52 },
  { label: 'T...', width: 42 },
  { label: 'Equipment / SR ...', width: 170 },
  { label: 'Part Name / Job T...', width: 190 },
  { label: 'Qty', width: 78 },
  { label: 'Unit', width: 74 },
  { label: 'Price / Cont. ...', width: 132 },
  { label: 'Disc.%', width: 82 },
  { label: 'Extd. Cost', width: 104 },
]

export const PURCHASE_ORDER_TERTIARY_COLUMNS = [
  { label: 'Rev', width: 92 },
  { label: 'Cost', width: 138 },
  { label: 'Cost (USD)', width: 150 },
  { label: 'Issued', width: 118 },
  { label: 'Person', width: 250 },
]

export const PURCHASE_ORDER_SECTIONS = [
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
    title: 'Purchase Order',
    fields: [
      { label: 'Status', chevron: true },
      {
        label: 'Company Warehouse',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Consolidation Warehouse',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Approval Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Issue Date',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Completed', value: '-- Select --', muted: true, chevron: true },
      { label: 'Cutoff Date', value: '08/23/2026', chevron: true },
    ],
  },
  {
    title: 'Admin Info',
    fields: [
      { label: 'Identifier', value: '-- Select --', muted: true, chevron: true },
      { label: 'Approver', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ready for Approval', checkbox: true },
      { label: 'Total Cost', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Department',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Subject Index',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Logistics',
    fields: [
      { label: 'Manifest Number' },
      {
        label: 'Shipment Status',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Meet Ship At',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Freight Forwarder',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Agent', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ship To', value: '-- Select --', muted: true, chevron: true },
      { label: 'Port', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Delivery Method',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Ship Via', value: '-- Select --', muted: true, chevron: true },
      { label: 'Location' },
      { label: 'Readiness', value: '-- Select --', muted: true, chevron: true },
      { label: 'PO Type', value: '-- Select --', muted: true, chevron: true },
      { label: 'Freight PO', checkbox: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Supplier', value: '-- Select --', muted: true, chevron: true },
      { label: 'Title' },
      { label: 'Linked to Technical Defect', checkbox: true },
      { label: 'Technical Defect No.' },
      { label: 'Currency', value: '-- Select --', muted: true, chevron: true },
      { label: "I'm the approver", checkbox: true },
      {
        label: 'Serialized Item Reference',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Serialized Item Repair', checkbox: true },
      { label: 'Serialized Item Purchase', checkbox: true },
      { label: 'Hazardous Material', checkbox: true },
      { label: 'For Contract Release', checkbox: true },
      {
        label: 'Material Contract',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Service Contract',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Tags' },
    ],
  },
  {
    title: 'Receive/Delivery',
    fields: [
      { label: 'Has Receiving Exception', checkbox: true },
      { label: 'Has Delivery Exception', checkbox: true },
      { label: 'Receiving Problem', value: '-- Select --', muted: true, chevron: true },
      { label: 'Vessel Action', value: '-- Select --', muted: true, chevron: true },
      { label: 'Vendor Action', value: '-- Select --', muted: true, chevron: true },
      { label: 'Follow Up', value: '-- Select --', muted: true, chevron: true },
      { label: 'Resolved Date', value: '-- Select --', muted: true, chevron: true },
    ],
  },
]
