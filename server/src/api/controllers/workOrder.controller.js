import * as workOrderService from '../services/workOrder.service.js'

export async function listWorkOrders(req, res) {
  res.json(await workOrderService.listWorkOrders(req.query))
}

export async function saveWorkOrder(req, res) {
  res.json(await workOrderService.saveWorkOrder(req.params.woNo, req.body))
}

export async function deleteWorkOrder(req, res) {
  await workOrderService.deleteWorkOrder(req.params.woNo)
  res.status(204).end()
}

export async function searchHistory(req, res) {
  res.json(await workOrderService.searchHistory(req.query))
}
