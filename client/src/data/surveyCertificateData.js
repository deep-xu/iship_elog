const BASE_JOB = {
  jobCode: '0178-00001-00153331',
  sectionLabel: 'Surveys/Certificates',
  shipName: 'Seaspan Benefactor',
  jobConstraint: 'Calendar-Based',
  calendarIntervalValue: '52',
  calendarIntervalUnit: 'Weeks',
  counterIntervalValue: '0',
  counterIntervalUnit: 'Hours',
  openWindowValue: '13',
  openWindowUnit: 'Weeks',
  closeWindowValue: '1',
  closeWindowUnit: 'Weeks',
  jobSize: '0',
  status: 'Active',
  jobCounter: '0',
  lastDue: '',
  service: '',
  questionnaire: '',
  siReference: '',
  vendorAnalysis: '',
  jsaRequired: false,
  ptwRequired: false,
  woTableEntriesRequired: false,
  woFindingsRequired: false,
  resources: {
    skills: '',
    estCost: '0',
    currency: 'USD',
    executionMethod: 'Outside Contractor',
    rows: [{ owner: true, positionName: 'Master', estManHours: '0.00' }],
  },
  adminInfo: {
    accountCode: '50802',
    accountName: 'Classification Fees Expense',
    department: 'DECK & ENGINE',
    jobCategory: 'Survey & Certificates',
    itemCategory: '',
    classNo: '',
    coastGuardNo: '',
    priority: 'D',
    standardJobCode: '',
    eventJobOnly: false,
    jobListIndexTerms: [],
    drydock: {
      standardItem: false,
      includeInShipyardRfq: false,
    },
  },
  questionnaireRows: [],
  materialsRows: [],
  changeLogRows: [{ action: 'Created', by: 'Andavan, Adrian', actedOn: '12/11/2025' }],
  tablesRows: [],
  relatedJobs: {
    rows: [],
    footerTabs: ['Defined Predecessors', 'Comparable Jobs', 'Jobs w/same Job Description'],
  },
  workOrders: {
    tabs: [
      'Misc.Equipment',
      'Tables',
      'Related Jobs',
      'Work Orders',
      'Certificates',
      'Sources',
      'Message',
      'File Attachments',
      'Sub-Items',
      'CM Equipments',
      'Notifications',
    ],
    rows: [
      {
        type: 'WO/Crew',
        number: '000015301609',
        title: 'Approved Rate of Discharge of Untreated Sewage',
        status: 'CLOS',
        scDate: '02/28/2026',
        cost: '0.00',
        contractor: '',
        event: '',
        findings: '',
      },
    ],
  },
  certificatesRows: [
    {
      certificate: 'Approved Rate of Discharge of Untreated Sewage',
      type: 'CERTS/STATUTORY',
      code: '',
    },
  ],
  messageRows: [],
  fileAttachmentsRows: [],
  notificationsRows: [],
}

function createSurveyJob({
  id,
  rowLabel,
  title,
  lastIss,
  nextDue,
  interval = '52WEEKS',
  certificateType = 'CERTS/STATUTORY',
  descriptionLines = [],
  lastDone = lastIss,
}) {
  return {
    id,
    row: {
      name: rowLabel,
      lastIss,
      lastDue: '',
      interval,
      nextDue,
      ext: '',
    },
    detail: {
      ...BASE_JOB,
      title,
      lastDone,
      certificatesRows: [{ certificate: title, type: certificateType, code: '' }],
      workOrders: {
        ...BASE_JOB.workOrders,
        rows: [
          {
            ...BASE_JOB.workOrders.rows[0],
            title,
            scDate: lastIss,
          },
        ],
      },
      jobDescription: [
        `Index: Survey Certificates*${BASE_JOB.sectionLabel}`,
        ...descriptionLines,
      ],
    },
  }
}

export const SURVEY_CERTIFICATE_GROUPS = [
  {
    id: 'statutory-group',
    type: 'group',
    name: '00 - CERTS/STATUTORY',
    lastIss: '',
    lastDue: '',
    interval: '',
    nextDue: '',
    ext: '',
  },
]

const SURVEY_JOBS = [
  createSurveyJob({
    id: 'approved-rate-of-discharge',
    rowLabel: '[0000] - Approved Rate of Discha...',
    title: 'Approved Rate of Discharge of Untreated Sewage',
    lastIss: '02/28/2026',
    nextDue: '02/27/2027',
    descriptionLines: [
      '- Index and file certificates/documents in the designated folder/location so they are readily available for inspection.',
      '',
      'Note 1: This is just a job to record that the relevant document is duly filed. This is not a maintenance record of any equipment.',
      '',
      'Note 2: Important pointers when updating the WO:',
      '- When updating the WO, navigate to certificates tab and ensure that correct certificate issue and expiry date are entered.',
      '- In case certificate is re-issued enter new dates.',
      '- As applicable attach the certificate from the certificates tab to the WO.',
    ],
  }),
  createSurveyJob({
    id: 'bwts-uscg-type-approval',
    rowLabel: '[0000] - BWTS USCG Type Approv...',
    title: 'BWTS USCG Type Approval',
    lastIss: '08/06/2026',
    nextDue: '08/05/2027',
    descriptionLines: ['- Confirm the BWTS approval certificate is valid and onboard.'],
  }),
  createSurveyJob({
    id: 'ballast-water-management',
    rowLabel: '[0000] - Ballast Water Managem...',
    title: 'Ballast Water Management Certificate',
    lastIss: '08/19/2026',
    nextDue: '08/18/2027',
    descriptionLines: ['- Verify the ballast water management certificate and endorsements.'],
  }),
  createSurveyJob({
    id: 'bridge-letter-opa90',
    rowLabel: '[0000] - Bridge Letter (OPA 90)',
    title: 'Bridge Letter (OPA 90)',
    lastIss: '08/05/2026',
    nextDue: '08/04/2027',
    descriptionLines: ['- Ensure the current bridge letter is filed and accessible.'],
  }),
  createSurveyJob({
    id: 'csr-form-1-2-3',
    rowLabel: '[0000] - CSR - Form 1, 2 & 3 (All C...',
    title: 'CSR - Form 1, 2 & 3 (All Changes)',
    lastIss: '07/15/2026',
    nextDue: '10/07/2026',
    interval: '12WEEKS',
    descriptionLines: ['- Maintain up-to-date continuous synopsis record forms.'],
  }),
  createSurveyJob({
    id: 'cargo-ship-safety-construction',
    rowLabel: '[0000] - Cargo Ship Safety Constr...',
    title: 'Cargo Ship Safety Construction',
    lastIss: '02/25/2026',
    nextDue: '02/24/2027',
    descriptionLines: ['- Verify the safety construction certificate validity.'],
  }),
  createSurveyJob({
    id: 'cargo-ship-safety-equipment',
    rowLabel: '[0000] - Cargo Ship Safety Equip...',
    title: 'Cargo Ship Safety Equipment',
    lastIss: '03/24/2026',
    nextDue: '03/23/2027',
    descriptionLines: ['- Verify the safety equipment certificate validity.'],
  }),
  createSurveyJob({
    id: 'cargo-ship-safety-radio',
    rowLabel: '[0000] - Cargo Ship Safety Radio ...',
    title: 'Cargo Ship Safety Radio',
    lastIss: '12/24/2025',
    nextDue: '12/23/2026',
    descriptionLines: ['- Verify the radio certificate validity and endorsements.'],
  }),
  createSurveyJob({
    id: 'crew-accommodation',
    rowLabel: '[0000] - Cert of Crew Accommoda...',
    title: 'Certificate of Crew Accommodation',
    lastIss: '08/21/2025',
    nextDue: '08/20/2026',
    descriptionLines: ['- Ensure accommodation certificate remains current.'],
  }),
  createSurveyJob({
    id: 'certificate-of-class',
    rowLabel: '[0000] - Certificate of Class',
    title: 'Certificate of Class',
    lastIss: '03/19/2026',
    nextDue: '03/18/2027',
    descriptionLines: ['- Confirm class certificate and latest endorsements are available.'],
  }),
  createSurveyJob({
    id: 'certificate-of-registry',
    rowLabel: '[0000] - Certificate of Registry (C...',
    title: 'Certificate of Registry',
    lastIss: '07/13/2026',
    nextDue: '07/12/2027',
    descriptionLines: ['- Confirm registry certificate details match vessel particulars.'],
  }),
  createSurveyJob({
    id: 'dmlc-1',
    rowLabel: '[0000] - DMLC-1',
    title: 'DMLC-1',
    lastIss: '12/03/2025',
    nextDue: '12/02/2026',
    descriptionLines: ['- Confirm DMLC-1 is valid and posted as required.'],
  }),
  createSurveyJob({
    id: 'dmlc-2',
    rowLabel: '[0000] - DMLC-2 + The Letter of R...',
    title: 'DMLC-2 + The Letter of Review',
    lastIss: '05/08/2026',
    nextDue: '05/07/2027',
    descriptionLines: ['- Confirm DMLC-2 and letter of review remain current.'],
  }),
]

export const SURVEY_CERTIFICATE_ROWS = [...SURVEY_CERTIFICATE_GROUPS, ...SURVEY_JOBS.map((job) => job.row)]

export const STANDARD_JOB_DETAILS = Object.fromEntries(
  SURVEY_JOBS.map((job) => [job.id, job.detail]),
)

export const SURVEY_CERTIFICATE_ROW_TO_DETAIL = Object.fromEntries(
  SURVEY_JOBS.map((job) => [job.row.name, job.id]),
)

let activeStandardJobDetailId = SURVEY_JOBS[0].id

export function setActiveStandardJobDetail(detailId) {
  if (STANDARD_JOB_DETAILS[detailId]) {
    activeStandardJobDetailId = detailId
  }
}

export function getActiveStandardJobDetail() {
  return STANDARD_JOB_DETAILS[activeStandardJobDetailId] ?? STANDARD_JOB_DETAILS[SURVEY_JOBS[0].id]
}
