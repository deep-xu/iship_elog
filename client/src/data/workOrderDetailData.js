import { PLAN_ROWS } from '@/data/maintenancePlan.js'

function inferEquipmentLabel(row) {
  if (row.majorSystem.includes('Main Propulsion Engine')) return 'Main Engine'
  if (row.majorSystem.includes('Auxiliary Diesel')) return 'Auxiliary Engine'
  if (row.majorSystem.includes('Boiler')) return 'Auxiliary Boiler'
  if (row.majorSystem.includes('Air Compressor')) return 'Air Compressor'
  return row.component || row.subSystem || 'Ship Equipment'
}

function inferJobCategory(row) {
  if (row.majorSystem.includes('Main Propulsion Engine')) return 'PM - Engine Job'
  if (row.department?.includes('Deck')) return 'PM - Deck Job'
  return 'PM - General Job'
}

function buildDescription(row) {
  return [
    `${row.component || row.subSystem || row.majorSystem}: ${row.jobTitle}`,
    '',
    `System: ${row.majorSystem}`,
    `Sub-System: ${row.subSystem}`,
    '',
    `Carry out the job "${row.jobTitle}" as per maker recommendations and vessel PMS requirements.`,
    `Interval basis: ${row.basis} / ${row.interval}.`,
    '',
    'Note 1: Record all observations, measurements, and replaced components in the relevant work order tabs.',
    'Note 2: Follow the applicable maintenance manual, onboard safety procedures, and permit-to-work requirements.',
    'Note 3: Verify spare availability before starting the job and update findings where defects are observed.',
  ]
}

function createDetail(row, index) {
  const woNumber = index === 1 ? '000015304302' : `00001530${String(index + 700).padStart(4, '0')}`
  const referenceCode = index === 1 ? '0159-00066-00005727' : `0159-00066-0000${String(index + 5727).padStart(4, '0')}`
  const equipment = inferEquipmentLabel(row)
  const counterValue =
    row.basis === 'Running Hours'
      ? (row.lastDone.match(/\d+/)?.[0] ?? '')
      : row.basis === 'Counter'
        ? (row.lastDone.match(/\d+/)?.[0] ?? '')
        : ''

  return {
    id: row.jobNo,
    titleBar: `Work Order - ${woNumber} - [${referenceCode}]`,
    menus: {
      description: ['File', 'Process', 'Description', 'Reports', 'Help'],
      jsa: ['File', 'Process', 'Safety Analysis', 'Reports', 'Help'],
      ptw: ['File', 'Process', 'Permit to Work', 'Reports', 'Help'],
      findings: ['File', 'Process', 'Findings', 'Reports', 'Help'],
      observation: ['File', 'Process', 'Observation', 'Reports', 'Help'],
      materials: ['File', 'Required/Used', 'Reports', 'Help'],
      default: ['File', 'Process', 'Reports', 'Help'],
    },
    shipName: 'MV Genco',
    woNumber,
    performBy: 'WO/Crew',
    priority: index === 1 ? 'C' : row.critical === 'Y' ? 'B' : 'C',
    scheduled: row.nextDue || '11/30/2025',
    completed: '',
    due: '',
    ext: '',
    questionnaire: '',
    cmType: '',
    ranks: '',
    identifier: '',
    siSerial: '',
    title: index === 1 ? 'Fuel Valves, Cyl NO.07 Overhaul / Parts renewal -2' : row.jobTitle,
    equipment,
    counter: counterValue,
    eventType: 'Event',
    vendorAnalysis: '',
    siReplaced: false,
    failure: false,
    conditionBased: false,
    findingsRequired: false,
    tableEntriesRequired: false,
    furtherActionRequired: false,
    stage: 'Created',
    descriptionLines: buildDescription(row),
    workCertificatesRows: [],
    findingsRows: [],
    observationRows: [],
    materialsRows: row.linkedPartNo
      ? [
          {
            equipment,
            partName: row.remarks || row.component,
            onHand: row.stockQty || '',
            onOrder: '0',
            required: '1',
            used: '0',
            unit: 'EA',
            location: 'Main Store',
            partNo: row.linkedPartNo,
          },
        ]
      : [],
    permitRows: [],
    adminFields: {
      account: '',
      project: '',
      jobCategory: inferJobCategory(row),
      cause: '',
      classNo: '',
      department: row.department?.includes('Deck') ? 'DECK' : 'ENGINE',
      itemCategory: row.subSystem,
      userDefined: '',
      scheduledBySystem: row.nextDue || '',
      graceDays: '',
      drydockJobCategory: '',
      abcIndicator: row.critical === 'Y' ? 'B - Monitor closely' : 'A - Will do',
      owner: row.responsible || '',
      costCenter: '',
      wbs: '',
    },
  }
}

function findPlanRowByJobNo(jobNo) {
  return PLAN_ROWS.find((row) => row.jobNo === jobNo) ?? null
}

function createDetailFromHistoryRow(row) {
  const matchedPlanRow = findPlanRowByJobNo(row.jobNo)
  if (matchedPlanRow) {
    const index = PLAN_ROWS.findIndex((planRow) => planRow.jobNo === row.jobNo)
    const baseDetail = createDetail(matchedPlanRow, index)
    const majorSystem = row.majorSystem || matchedPlanRow.majorSystem
    const component = row.component || matchedPlanRow.component
    return {
      ...baseDetail,
      shipName: row.ship || baseDetail.shipName,
      woNumber: row.jobNo || baseDetail.woNumber,
      title: row.jobTitle || baseDetail.title,
      equipment: inferEquipmentLabel({
        ...matchedPlanRow,
        majorSystem,
        component,
      }),
      scheduled: row.readingAtCompletion || baseDetail.scheduled,
      completed: row.completionDate || baseDetail.completed,
      descriptionLines: buildDescription({
        ...matchedPlanRow,
        jobTitle: row.jobTitle || matchedPlanRow.jobTitle,
        majorSystem,
        component,
      }),
      adminFields: {
        ...baseDetail.adminFields,
        department: row.department?.includes('Deck') ? 'DECK' : 'ENGINE',
      },
    }
  }

  const equipment = row.component || row.majorSystem || 'Ship Equipment'
  return {
    id: row.jobNo,
    titleBar: `Work Order - ${row.jobNo || 'History'} - [Completed Job]`,
    menus: {
      description: ['File', 'Process', 'Description', 'Reports', 'Help'],
      jsa: ['File', 'Process', 'Safety Analysis', 'Reports', 'Help'],
      ptw: ['File', 'Process', 'Permit to Work', 'Reports', 'Help'],
      findings: ['File', 'Process', 'Findings', 'Reports', 'Help'],
      observation: ['File', 'Process', 'Observation', 'Reports', 'Help'],
      materials: ['File', 'Required/Used', 'Reports', 'Help'],
      default: ['File', 'Process', 'Reports', 'Help'],
    },
    shipName: row.ship || 'MV Genco',
    woNumber: row.jobNo || '',
    performBy: row.performedBy || 'WO/Crew',
    priority: 'C',
    scheduled: row.readingAtCompletion || '',
    completed: row.completionDate || '',
    due: '',
    ext: row.deferredDate || '',
    grace: row.grace || '',
    questionnaire: '',
    cmType: '',
    ranks: '',
    identifier: '',
    siSerial: '',
    title: row.jobTitle || '',
    equipment,
    counter: row.readingAtCompletion || '',
    eventType: 'Event',
    vendorAnalysis: '',
    siReplaced: false,
    failure: false,
    conditionBased: false,
    findingsRequired: false,
    tableEntriesRequired: false,
    furtherActionRequired: false,
    stage: 'Completed',
    descriptionLines: [
      `${equipment}: ${row.jobTitle || 'Completed work order'}`,
      '',
      `System: ${row.majorSystem || equipment}`,
      '',
      row.remarks || 'Completed work order loaded from history.',
    ],
    workCertificatesRows: [],
    findingsRows: [],
    observationRows: [],
    materialsRows: [],
    permitRows: [],
    adminFields: {
      account: '',
      project: '',
      jobCategory: 'PM - General Job',
      cause: '',
      classNo: '',
      department: row.department?.includes('Deck') ? 'DECK' : 'ENGINE',
      itemCategory: row.component || '',
      userDefined: '',
      scheduledBySystem: row.completionDate || '',
      graceDays: '',
      drydockJobCategory: '',
      abcIndicator: 'A - Will do',
      owner: row.performedBy || '',
      costCenter: '',
      wbs: '',
    },
  }
}

const BLANK_WORK_ORDER_DETAIL = {
  id: 'new-work-order',
  titleBar: 'Work Order - New',
  menus: {
    description: ['File', 'Process', 'Description', 'Reports', 'Help'],
    jsa: ['File', 'Process', 'Safety Analysis', 'Reports', 'Help'],
    ptw: ['File', 'Process', 'Permit to Work', 'Reports', 'Help'],
    findings: ['File', 'Process', 'Findings', 'Reports', 'Help'],
    observation: ['File', 'Process', 'Observation', 'Reports', 'Help'],
    materials: ['File', 'Required/Used', 'Reports', 'Help'],
    default: ['File', 'Process', 'Reports', 'Help'],
  },
  shipName: 'MV Genco',
  woNumber: '',
  performBy: '',
  priority: '',
  scheduled: '',
  completed: '',
  due: '',
  ext: '',
  questionnaire: '',
  cmType: '',
  ranks: '',
  identifier: '',
  siSerial: '',
  title: '',
  equipment: '',
  counter: '',
  eventType: 'Event',
  vendorAnalysis: '',
  siReplaced: false,
  failure: false,
  conditionBased: false,
  findingsRequired: false,
  tableEntriesRequired: false,
  furtherActionRequired: false,
  stage: 'Created',
  descriptionLines: [],
  workCertificatesRows: [],
  findingsRows: [],
  observationRows: [],
  materialsRows: [],
  permitRows: [],
  adminFields: {
    account: '',
    project: '',
    jobCategory: '',
    cause: '',
    classNo: '',
    department: '',
    itemCategory: '',
    userDefined: '',
    scheduledBySystem: '',
    graceDays: '',
    drydockJobCategory: '',
    abcIndicator: '',
    owner: '',
    costCenter: '',
    wbs: '',
  },
}

export const WORK_ORDER_DETAILS = Object.fromEntries(
  PLAN_ROWS.map((row, index) => [row.jobNo, createDetail(row, index)])
)

let activeWorkOrderDetailId = PLAN_ROWS[1]?.jobNo ?? PLAN_ROWS[0]?.jobNo ?? ''

export function setActiveWorkOrderDetail(detailId) {
  if (WORK_ORDER_DETAILS[detailId]) {
    activeWorkOrderDetailId = detailId
  }
}

export function getActiveWorkOrderDetail() {
  return (
    WORK_ORDER_DETAILS[activeWorkOrderDetailId] ??
    WORK_ORDER_DETAILS[PLAN_ROWS[1]?.jobNo] ??
    WORK_ORDER_DETAILS[PLAN_ROWS[0]?.jobNo]
  )
}

export function getWorkOrderDetailFromRow(row) {
  if (!row) return getActiveWorkOrderDetail()
  const detail = createDetailFromHistoryRow(row)
  // Re-apply any edits the user saved on this work order so reopening it
  // shows every change made before approval, not just the summary columns.
  return row.formSnapshot ? { ...detail, ...row.formSnapshot } : detail
}

export function getBlankWorkOrderDetail() {
  return BLANK_WORK_ORDER_DETAIL
}
