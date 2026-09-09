import { pool, upsertMany } from '../../pool.js'
import { importModule, text, json } from '../sourceData.js'

export const vesselSeeder = {
  name: 'vessel_certificates',
  async seed() {
    const { VESSEL_CERTIFICATE_DASHBOARD_ROWS } = await importModule(
      'vesselCertificateDashboard.js',
    )

    // Only the seeded rows are replaced; certificates added through the UI
    // (origin 'user') are left alone.
    await pool.query("DELETE FROM vessel_certificates WHERE origin = 'seed'")

    const rows = VESSEL_CERTIFICATE_DASHBOARD_ROWS.map((row) => ({
      ship: text(row.ship),
      cert_type: text(row.type),
      code: text(row.code),
      cert_no: text(row.certNo),
      cert_name: text(row.certName),
      issue_date: text(row.issue),
      expiry_date: text(row.expiry),
      last_survey: text(row.lastSurvey),
      next_survey: text(row.nextSurvey),
      due_days: text(row.due),
      due_tone: text(row.dueTone),
      intermediate1: text(row.intermediate1),
      intermediate2: text(row.intermediate2),
      next_action: text(row.nextAction),
      origin: 'seed',
    }))

    return upsertMany('vessel_certificates', Object.keys(rows[0]), rows)
  },
}

export const surveySeeder = {
  name: 'survey_certificates',
  async seed() {
    const { SURVEY_CERTIFICATE_ROWS, STANDARD_JOB_DETAILS, SURVEY_CERTIFICATE_ROW_TO_DETAIL } =
      await importModule('surveyCertificateData.js')

    const rows = SURVEY_CERTIFICATE_ROWS.map((row, index) => {
      const detailId = SURVEY_CERTIFICATE_ROW_TO_DETAIL[row.name]

      return {
        id: row.id ?? detailId ?? `survey-row-${index}`,
        row_type: row.type === 'group' ? 'group' : 'job',
        name: text(row.name),
        title: text(STANDARD_JOB_DETAILS[detailId]?.title ?? row.name),
        last_iss: text(row.lastIss),
        last_due: text(row.lastDue),
        interval_text: text(row.interval),
        next_due: text(row.nextDue),
        ext: text(row.ext),
        position: index,
        row_data: json(row),
        detail: detailId ? json(STANDARD_JOB_DETAILS[detailId]) : null,
        origin: 'seed',
      }
    })

    return upsertMany('survey_certificates', Object.keys(rows[0]), rows)
  },
}
