import * as standardJobService from '../services/standardJob.service.js'

export async function listJobs(_req, res) {
  res.json(await standardJobService.listJobs())
}

export async function getJob(req, res) {
  res.json(await standardJobService.getJob(req.params.jobNo))
}

export async function saveJob(req, res) {
  res.json(await standardJobService.saveJob(req.params.jobNo, req.body))
}

export async function listRelatedJobs(_req, res) {
  res.json(await standardJobService.listRelatedJobs())
}

export async function replaceRelatedJobs(req, res) {
  res.json(await standardJobService.replaceRelatedJobs(req.params.sourceKey, req.body?.rows))
}
