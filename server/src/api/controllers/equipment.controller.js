import * as equipmentService from '../services/equipment.service.js'

// `userId` decides which owned branches are visible; without it only the
// shared hierarchy comes back.
export async function getTree(req, res) {
  res.json(await equipmentService.getTree(req.query.userId ?? null))
}

export async function listAdditions(req, res) {
  res.json(await equipmentService.listAdditions(req.query.userId ?? null))
}

export async function createNode(req, res) {
  res.status(201).json(await equipmentService.createNode(req.body ?? {}))
}

export async function deleteNode(req, res) {
  await equipmentService.deleteNode(req.params.id)
  res.status(204).end()
}

export async function getCounterAllowed(_req, res) {
  res.json(await equipmentService.getCounterAllowedMap())
}

export async function setCounterAllowed(req, res) {
  const { key, allowed } = req.body ?? {}
  res.json(await equipmentService.setCounterAllowed(key, allowed))
}
