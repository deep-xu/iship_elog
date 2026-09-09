import { query } from '../../database/pool.js'
import { toCamel, asText, parseJson } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// ------------------------------------------------------ vessel certificates
const COLUMNS = {
  ship: 'ship',
  type: 'cert_type',
  code: 'code',
  certNo: 'cert_no',
  certName: 'cert_name',
  issue: 'issue_date',
  expiry: 'expiry_date',
  lastSurvey: 'last_survey',
  nextSurvey: 'next_survey',
  due: 'due_days',
  dueTone: 'due_tone',
  intermediate1: 'intermediate1',
  intermediate2: 'intermediate2',
  nextAction: 'next_action',
}

// The dashboard grid reads four of these under their original short names.
function toVesselCertificate(row) {
  const { certType, issueDate, expiryDate, dueDays, origin, createdAt, updatedAt, ...rest } =
    toCamel(row)
  return { ...rest, type: certType, issue: issueDate, expiry: expiryDate, due: dueDays }
}

export async function listVesselCertificates({ ship, search } = {}) {
  const clauses = []
  const params = []

  if (ship) {
    clauses.push('ship = ?')
    params.push(ship)
  }
  if (search) {
    clauses.push('(cert_name LIKE ? OR cert_no LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }

  const rows = await query(
    `SELECT * FROM vessel_certificates
     ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''} ORDER BY id`,
    params,
  )
  return rows.map(toVesselCertificate)
}

async function findVesselCertificate(id) {
  const rows = await query('SELECT * FROM vessel_certificates WHERE id = ?', [id])
  if (!rows.length) throw new HttpError(404, 'Not found.')
  return toVesselCertificate(rows[0])
}

export async function createVesselCertificate(body = {}) {
  const columns = [...Object.values(COLUMNS), 'origin']
  const result = await query(
    `INSERT INTO vessel_certificates (${columns.join(', ')})
     VALUES (${columns.map(() => '?').join(', ')})`,
    [...Object.keys(COLUMNS).map((key) => asText(body[key])), 'user'],
  )
  return findVesselCertificate(result.insertId)
}

export async function updateVesselCertificate(id, body = {}) {
  const supplied = Object.entries(COLUMNS).filter(([key]) => body[key] !== undefined)
  if (!supplied.length) throw new HttpError(400, 'No updatable fields supplied.')

  const result = await query(
    `UPDATE vessel_certificates
        SET ${supplied.map(([, column]) => `${column} = ?`).join(', ')}
      WHERE id = ?`,
    [...supplied.map(([key]) => asText(body[key])), id],
  )
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')

  return findVesselCertificate(id)
}

export async function deleteVesselCertificate(id) {
  const result = await query('DELETE FROM vessel_certificates WHERE id = ?', [id])
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')
}

// ------------------------------------------------------ survey certificates
// Each row carries the grid row plus the Standard Job detail behind it, so the
// Survey Certificate manager can open a row without a second round trip.
export async function listSurveyCertificates() {
  const rows = await query('SELECT * FROM survey_certificates ORDER BY position, id')

  return rows.map((row) => ({
    ...parseJson(row.row_data, {}),
    id: row.id,
    type: row.row_type === 'group' ? 'group' : undefined,
    detail: parseJson(row.detail),
  }))
}

export async function saveSurveyCertificate(id, { row, detail } = {}) {
  const result = await query(
    `UPDATE survey_certificates
        SET row_data = ?, detail = ?, last_iss = ?, next_due = ?, origin = 'user'
      WHERE id = ?`,
    [
      JSON.stringify(row ?? {}),
      detail === undefined ? null : JSON.stringify(detail),
      asText(row?.lastIss),
      asText(row?.nextDue),
      id,
    ],
  )
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')
  return { id }
}
