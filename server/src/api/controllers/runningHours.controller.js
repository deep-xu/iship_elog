import * as runningHoursService from '../services/runningHours.service.js'

export async function getState(_req, res) {
  res.json(await runningHoursService.getState())
}

export async function replaceState(req, res) {
  res.json(await runningHoursService.replaceState(req.body))
}
