// Vessel and Survey certificate rows, served from MySQL. The bundled arrays
// stay as the fallback the caches start from, so the windows still render if
// the database is unreachable.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'
import { VESSEL_CERTIFICATE_DASHBOARD_ROWS } from '@/data/vesselCertificateDashboard.js'
import { SURVEY_CERTIFICATE_ROWS, STANDARD_JOB_DETAILS } from '@/data/surveyCertificateData.js'

const VESSEL_KEY = 'ns5-vessel-certificates'
const SURVEY_KEY = 'ns5-survey-certificates'

const vesselStore = createStore(VESSEL_KEY, VESSEL_CERTIFICATE_DASHBOARD_ROWS)
const surveyStore = createStore(SURVEY_KEY, SURVEY_CERTIFICATE_ROWS)

export async function hydrateCertificates() {
  const [vessel, survey] = await Promise.all([
    api.get('/certificates/vessel'),
    api.get('/certificates/survey'),
  ])
  vesselStore.hydrate(vessel)
  surveyStore.hydrate(survey)
  return { vessel, survey }
}

export function loadVesselCertificates() {
  const rows = vesselStore.get()
  return Array.isArray(rows) && rows.length ? rows : VESSEL_CERTIFICATE_DASHBOARD_ROWS
}

export function loadSurveyCertificates() {
  const rows = surveyStore.get()
  return Array.isArray(rows) && rows.length ? rows : SURVEY_CERTIFICATE_ROWS
}

// The Standard Job detail behind one survey certificate row. Rows loaded from
// MySQL carry their detail inline; the bundled fallback keeps it in a lookup.
export function loadSurveyCertificateDetail(id) {
  const row = loadSurveyCertificates().find((item) => item.id === id)
  return row?.detail ?? STANDARD_JOB_DETAILS[id] ?? null
}

export async function addVesselCertificate(row) {
  const created = await api.post('/certificates/vessel', row)
  vesselStore.hydrate([...loadVesselCertificates(), created])
  return created
}

export async function updateVesselCertificate(id, row) {
  const updated = await api.put(`/certificates/vessel/${encodeURIComponent(id)}`, row)
  vesselStore.hydrate(loadVesselCertificates().map((item) => (item.id === id ? updated : item)))
  return updated
}

export async function deleteVesselCertificate(id) {
  await api.delete(`/certificates/vessel/${encodeURIComponent(id)}`)
  vesselStore.hydrate(loadVesselCertificates().filter((item) => item.id !== id))
}
