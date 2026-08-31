import jobCompletionHistoryRows from './jobCompletionHistory.json'

export const WORK_ORDER_SEARCH_COLUMNS = [
  { key: 'ship', label: 'Ship', width: 92 },
  { key: 'jobNo', label: 'Job No.', width: 110 },
  { key: 'jobTitle', label: 'Job Title', width: 190 },
  { key: 'majorSystem', label: 'Major System', width: 185 },
  { key: 'component', label: 'Component', width: 150 },
  { key: 'completionDate', label: 'Completion Date', width: 115 },
  { key: 'readingAtCompletion', label: 'Reading At Completion', width: 132 },
  { key: 'department', label: 'Department', width: 120 },
  { key: 'performedBy', label: 'Performed By', width: 110 },
  { key: 'remarks', label: 'Remarks', width: 185 },
]

export const WORK_ORDER_SEARCH_ROWS = jobCompletionHistoryRows

export const WORK_ORDER_SEARCH_SECTIONS = [
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
    ],
  },
  {
    title: 'Work Order',
    fields: [
      { label: 'Job Type', chevron: true },
      { label: 'Job Status', chevron: true },
      { label: 'PM/Non-PM', chevron: true },
      { label: 'Quoted/Non-Quoted Jobs', chevron: true },
      { label: 'Anomaly Jobs Only', checkbox: true },
      { label: 'DDK Jobs Only', checkbox: true },
      { label: 'Corrective Maintenance', checkbox: true },
      { label: "Include Hidden Ship's Jobs", checkbox: true },
      { label: 'To be Re-scheduled', checkbox: true },
      { label: 'Rescheduled', checkbox: true },
      { label: 'Reschedule Declined', checkbox: true },
      { label: 'Open Work Orders', checkbox: true },
      { label: "Open SR's", checkbox: true },
      { label: 'SI Repair Job', checkbox: true },
    ],
  },
  {
    title: 'Date Range',
    fields: [
      { label: 'Created', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Scheduled',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Completed',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Closed', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Cancelled',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Indexes',
    fields: [
      { label: 'Job Cause', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Job Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Department',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Event', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Item Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Job Criteria',
    fields: [
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      { label: 'Space', value: '-- Select --', muted: true, chevron: true },
      { label: 'Surveys', value: '-- Select --', muted: true, chevron: true },
      { label: 'Service', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Misc. Work',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Condition Monitoring',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Structure',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Failure Data',
    fields: [
      { label: 'Failure', chevron: true },
      {
        label: 'Equipment Offline',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Failure Cause',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Failure Mode',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Failure Class',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Total Repair Cost Over', value: '0.00' },
    ],
  },
  {
    title: 'Condition Filters',
    fields: [
      { label: 'Condition Filters', chevron: true },
      {
        label: 'CM Vendor',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'CM Type', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Job Safety Analysis',
    fields: [
      { label: 'JSA Only', checkbox: true },
      { label: 'JSA Type', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'JSA Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Equipment Code' },
      { label: 'Equipment Name' },
      { label: 'Equipment Criticality', chevron: true },
      { label: 'Class Jobs Only', checkbox: true },
      { label: 'Class No.' },
      { label: 'Jobs related to class Findings', checkbox: true },
      { label: 'Class Findings' },
      { label: 'Resources', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Serialized Item Reference',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Serialized Parts', checkbox: true },
      {
        label: 'Est. Cost',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Parts Required', checkbox: true },
      { label: 'Parts Used', checkbox: true },
      { label: 'Parts Shortage', checkbox: true },
      { label: 'Findings', checkbox: true },
      { label: 'Table Entries', checkbox: true },
      { label: "Has Related WO's", checkbox: true },
      { label: "I'm the approver", checkbox: true },
      { label: "I'm the approver by Role", checkbox: true },
      { label: "I'm the Owner", checkbox: true },
      {
        label: 'Exported via Purch. Intf.',
        chevron: true,
      },
      {
        label: 'Acknowledged in External System',
        chevron: true,
      },
      { label: 'SR External ID' },
    ],
  },
]
