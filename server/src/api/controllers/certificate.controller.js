import * as certificateService from '../services/certificate.service.js'

export async function listVessel(req, res) {
  res.json(await certificateService.listVesselCertificates(req.query))
}

export async function createVessel(req, res) {
  res.status(201).json(await certificateService.createVesselCertificate(req.body))
}

export async function updateVessel(req, res) {
  res.json(await certificateService.updateVesselCertificate(req.params.id, req.body))
}

export async function deleteVessel(req, res) {
  await certificateService.deleteVesselCertificate(req.params.id)
  res.status(204).end()
}

export async function listSurvey(_req, res) {
  res.json(await certificateService.listSurveyCertificates())
}

export async function saveSurvey(req, res) {
  res.json(await certificateService.saveSurveyCertificate(req.params.id, req.body))
}
