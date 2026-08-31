export const PERMIT_TO_WORK_LIST_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', dropdown: true },
      { label: 'Document No.' },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', dropdown: true, muted: '-- Select --' },
      { label: 'Requested Date', dropdown: true, muted: '-- Select --' },
      { label: 'Approved Date', dropdown: true, muted: '-- Select --' },
      { label: 'Accepted Date', dropdown: true, muted: '-- Select --' },
      { label: 'Cancelled', dropdown: true, muted: '-- Select --' },
      { label: 'Job Start Date', dropdown: true, muted: '-- Select --' },
      { label: 'Job End Date', dropdown: true, muted: '-- Select --' },
    ],
  },
  {
    title: 'Current Status',
    fields: [{ label: 'Status', dropdown: true, muted: '-- Select --' }],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'PTW Type', dropdown: true, muted: '-- Select --' },
      { label: 'Category', dropdown: true, muted: '-- Select --' },
      { label: 'Questionnaire', dropdown: true, muted: '-- Select --' },
      { label: 'Risk Level', dropdown: true, muted: '-- Select --' },
      { label: 'PTW Template', dropdown: true, muted: '-- Select --' },
      { label: 'Doc Owner(User)', dropdown: true, muted: '-- Select --' },
      { label: 'Doc Owner(Role)', dropdown: true, muted: '-- Select --' },
      { label: 'Responsible Role', dropdown: true, muted: '-- Select --' },
      { label: 'Cancellation Reasons', dropdown: true, muted: '-- Select --' },
      { label: 'Suspension Reasons', dropdown: true, muted: '-- Select --' },
      { label: "I'm the approver", checkbox: true },
      { label: "I'm the approver by Role", checkbox: true },
      { label: 'Expired', checkbox: true },
    ],
  },
]

export const PERMIT_TO_WORK_LIST_COLUMNS = [
  { label: 'PTW ...', width: '90px' },
  { label: 'Title', width: '116px' },
  { label: 'Status', width: '92px' },
  { label: 'PTW ...', width: '86px' },
  { label: 'Cate...', width: '86px' },
  { label: 'Task ...', width: '88px' },
  { label: 'Doc ...', width: '88px' },
  { label: 'Resp...', width: '92px' },
  { label: 'Reques...', width: '104px' },
]
