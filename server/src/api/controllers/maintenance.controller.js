import * as maintenanceService from '../services/maintenance.service.js'

export async function listJobs(req, res) {
  res.json(await maintenanceService.listJobs(req.query))
}

export async function updateJob(req, res) {
  res.json(await maintenanceService.updateJob(req.params.jobNo, req.body))
}
