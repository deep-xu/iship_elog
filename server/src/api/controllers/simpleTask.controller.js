import * as simpleTaskService from '../services/simpleTask.service.js'

export async function listTasks(_req, res) {
  res.json(await simpleTaskService.listTasks())
}

export async function replaceTasks(req, res) {
  res.json(await simpleTaskService.replaceTasks(req.body?.rows))
}

export async function deleteTask(req, res) {
  await simpleTaskService.deleteTask(req.params.id)
  res.status(204).end()
}
