import standardJobRows from './standardJobRows.json'

// Columns mirror the "standard data.xlsx" sheet headers.
export const STANDARD_JOB_COLUMNS = [
  { key: 'ship', label: 'Ship', width: 110 },
  { key: 'jobNo', label: 'Job No.', width: 120 },
  { key: 'jobTitle', label: 'Job Title', width: 260 },
  { key: 'majorSystem', label: 'Major System', width: 240 },
  { key: 'component', label: 'Component', width: 190 },
  { key: 'completionDate', label: 'Completion Date', width: 130 },
  { key: 'readingAtCompletion', label: 'Reading at Completion', width: 150 },
  { key: 'department', label: 'Department', width: 150 },
  { key: 'performedBy', label: 'Performed By', width: 130 },
  { key: 'remarks', label: 'Remarks', width: 280 },
]

export const STANDARD_JOB_ROWS = standardJobRows

export const STANDARD_JOB_SECTIONS = [
  {
    title: 'General',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Job Type', chevron: true },
      { label: 'Show Linked SI', checkbox: true },
    ],
  },
  {
    title: 'Job Criteria',
    fields: [
      { label: 'Equipment', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'CBM Equipment',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      {
        label: 'Maintained Part',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Space', value: '-- Select --', muted: true, chevron: true },
      { label: 'Surveys', value: '-- Select --', muted: true, chevron: true },
      { label: 'Service', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Misc. Work',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'CM Type', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Structure',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
  {
    title: 'Indexes',
    fields: [
      {
        label: 'Job Size Index',
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
      {
        label: 'Job Category',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Job List', value: '-- Select --', muted: true, chevron: true },
      { label: 'Job Desc.', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: 'Equipment Code' },
      { label: 'Equipment Name' },
      { label: 'Class No.' },
      { label: 'Coast Guard No.' },
      { label: 'Type', chevron: true },
      { label: 'Class', chevron: true },
      { label: 'Status', chevron: true },
      { label: 'Min. Priority', chevron: true },
      { label: 'Equipment Criticality', chevron: true },
      { label: '"Due" Cutoff Dt.', value: '= 08/23/2026', chevron: true },
      { label: 'JSA', value: '-- Select --', muted: true, chevron: true },
      {
        label: 'Serialized Item Reference',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
      { label: 'Serialized Parts', checkbox: true },
      { label: 'Usual Method of Execution', chevron: true },
    ],
  },
  {
    title: 'Drydock',
    fields: [
      { label: 'DDK Items', chevron: true },
      { label: 'Min. A/B/C', chevron: true },
      {
        label: 'DDK Job Cat.',
        value: '-- Select --',
        muted: true,
        chevron: true,
      },
    ],
  },
]
