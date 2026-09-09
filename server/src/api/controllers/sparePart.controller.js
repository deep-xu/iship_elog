import * as sparePartService from '../services/sparePart.service.js'

export async function listParts(req, res) {
  res.json(await sparePartService.listParts(req.query))
}

export async function updateStock(req, res) {
  res.json(await sparePartService.updateStock(req.params.partNo, req.body?.stockQty))
}
