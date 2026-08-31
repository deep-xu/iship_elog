export const RUNNING_HOURS_COLUMNS = [
  { label: 'Machine Name', width: 220 },
  { label: 'Top Level Name', width: 190 },
  { label: 'Last Counter', width: 110 },
  { label: 'Last Date', width: 100 },
  { label: 'New Counter', width: 110 },
  { label: 'Date Time', width: 100 },
]

const TODAY = '08/23/2026'

export const RUNNING_HOURS_ROWS = [
  { machine: 'AC Compressor & Attach #1', topLevel: 'HVAC & Refrigeration', lastCounter: '44,928', lastDate: '08/16/2026' },
  { machine: 'AC Compressor & Attach #2', topLevel: 'HVAC & Refrigeration', lastCounter: '43,668', lastDate: '08/16/2026' },
  { machine: 'Ballast Water Treatment Syst...', topLevel: 'Bilge & Ballast Systems', lastCounter: '1,121', lastDate: '08/16/2026' },
  { machine: 'G/E L.O. Purifier #1', topLevel: 'Lube Oil System', lastCounter: '40,688', lastDate: '08/16/2026' },
  { machine: 'G/E L.O. Purifier #2', topLevel: 'Lube Oil System', lastCounter: '32,363', lastDate: '08/16/2026' },
  { machine: 'HFO Purifier #1', topLevel: 'Fuel Oil Systems', lastCounter: '20,490', lastDate: '08/16/2026' },
  { machine: 'HFO Purifier #2', topLevel: 'Fuel Oil Systems', lastCounter: '34,458', lastDate: '08/16/2026' },
  { machine: 'HFO Purifier #3', topLevel: 'Fuel Oil Systems', lastCounter: '52,645', lastDate: '08/09/2026' },
  { machine: 'Incinerator', topLevel: 'Bilge & Ballast Systems', lastCounter: '3,469', lastDate: '08/16/2026' },
  { machine: 'M/E Aux Blower #1 (F)', topLevel: 'Propulsion Plant', lastCounter: '34,874', lastDate: '08/16/2026' },
  { machine: 'M/E Aux Blower #2 (M)', topLevel: 'Propulsion Plant', lastCounter: '35,325', lastDate: '08/16/2026' },
  { machine: 'M/E Aux Blower #3 (A)', topLevel: 'Propulsion Plant', lastCounter: '35,295', lastDate: '08/16/2026' },
  { machine: 'M/E L.O. Purifier #1', topLevel: 'Lube Oil System', lastCounter: '68,867', lastDate: '08/16/2026' },
  { machine: 'M/E L.O. Purifier #2', topLevel: 'Lube Oil System', lastCounter: '16,184', lastDate: '08/16/2026' },
  { machine: 'Main Air Compressor #1 (I)', topLevel: 'Compressed Air Systems', lastCounter: '16,502', lastDate: '08/16/2026' },
  { machine: 'Main Air Compressor #2 (C)', topLevel: 'Compressed Air Systems', lastCounter: '7,091', lastDate: '08/16/2026' },
  { machine: 'Main Air Compressor #3 (O)', topLevel: 'Compressed Air Systems', lastCounter: '12,636', lastDate: '08/16/2026' },
  { machine: 'Main Air Compressor #4 (Eme...', topLevel: 'Compressed Air Systems', lastCounter: '3,452', lastDate: '08/16/2026' },
  { machine: 'Main Diesel Generator Engin...', topLevel: 'Auxiliary Engines', lastCounter: '14,109', lastDate: '08/16/2026' },
  { machine: 'Main Diesel Generator Engin...', topLevel: 'Auxiliary Engines', lastCounter: '38,981', lastDate: '08/09/2026' },
  { machine: 'Main Diesel Generator Engin...', topLevel: 'Auxiliary Engines', lastCounter: '30,612', lastDate: '08/16/2026' },
  { machine: 'Main Diesel Generator Engin...', topLevel: 'Auxiliary Engines', lastCounter: '20,777', lastDate: '08/16/2026' },
  { machine: 'Main Engine', topLevel: 'Propulsion Plant', lastCounter: '62,115', lastDate: '08/16/2026' },
  { machine: 'Refrigeration Compressor/Att...', topLevel: 'HVAC & Refrigeration', lastCounter: '35,796', lastDate: '08/21/2026' },
  { machine: 'Refrigeration Compressor/Att...', topLevel: 'HVAC & Refrigeration', lastCounter: '33,329', lastDate: '08/16/2026' },
  { machine: 'S/T L.O. Advanced Cooling Sy...', topLevel: 'Lube Oil System', lastCounter: '6,947', lastDate: '08/16/2026' },
].map((row) => ({ ...row, newCounter: 0, dateTime: TODAY }))

export const COUNTER_HISTORY_COLUMNS = [
  { label: 'Date Time', width: 130 },
  { label: 'Added', width: 110 },
  { label: 'New Counter', width: 130 },
  { label: 'Reset?', width: 90 },
]

export const COUNTER_HISTORY_ROWS = [
  ['08/16/2026', 168, '44,928', 'No'],
  ['08/09/2026', 72, '44,760', 'No'],
  ['08/06/2026', 96, '44,688', 'No'],
  ['08/02/2026', 166, '44,592', 'No'],
  ['07/26/2026', 166, '44,426', 'No'],
  ['07/19/2026', 317, '44,260', 'No'],
  ['07/01/2026', 72, '43,943', 'No'],
  ['06/29/2026', 169, '43,871', 'No'],
  ['06/22/2026', 232, '43,702', 'No'],
  ['06/14/2026', 41, '43,470', 'No'],
  ['06/12/2026', 60, '43,429', 'No'],
  ['06/07/2026', 170, '43,369', 'No'],
  ['05/31/2026', 163, '43,199', 'No'],
  ['05/24/2026', 0, '43,036', 'No'],
  ['05/18/2026', 217, '43,036', 'No'],
  ['05/06/2026', 12, '42,819', 'No'],
  ['05/05/2026', 12, '42,807', 'No'],
  ['05/04/2026', 279, '42,795', 'No'],
  ['04/19/2026', 168, '42,516', 'No'],
  ['04/13/2026', 0, '42,348', 'No'],
  ['04/05/2026', 104, '42,348', 'No'],
  ['03/10/2026', 12, '42,244', 'No'],
  ['03/09/2026', 126, '42,232', 'No'],
  ['03/02/2026', 171, '42,106', 'No'],
  ['02/23/2026', 168, '41,935', 'No'],
  ['02/16/2026', 140, '41,767', 'No'],
  ['02/09/2026', 140, '41,627', 'No'],
  ['02/02/2026', 72, '41,487', 'No'],
  ['01/29/2026', 94, '41,415', 'No'],
  ['01/26/2026', 168, '41,321', 'No'],
  ['01/19/2026', 167, '41,153', 'No'],
  ['01/12/2026', 0, '40,986', 'No'],
  ['01/05/2026', 0, '40,986', 'No'],
  ['12/28/2025', 0, '40,986', 'No'],
  ['12/21/2025', 0, '40,986', 'No'],
  ['12/14/2025', 0, '40,986', 'No'],
  ['12/07/2025', 0, '40,986', 'No'],
  ['11/30/2025', 0, '40,986', 'No'],
]

export const RELATED_STANDARD_JOBS_COLUMNS = [
  { label: 'Size', width: 60 },
  { label: 'Job Title', width: 260 },
  { label: 'Job Interval', width: 100 },
  { label: 'Interval U...', width: 90 },
  { label: 'Job Counter...', width: 110 },
  { label: 'Last Done ...', width: 110 },
]

export const RELATED_STANDARD_JOBS_ROWS = [
  ['1', 'AC Compressor & Attach #1 Gen inspc/S...', '500', 'Hrs', '240.00', '08/06/2026'],
  ['3', 'AC Compressor & Attach #1 Specific Che...', '10000', 'Hrs', '2,109.00', '05/06/2026'],
]

export const RELATED_MACHINERY_COLUMNS = [
  { label: 'Name', width: 260 },
  { label: 'Total Hours', width: 130 },
  { label: 'Status', width: 130 },
]
