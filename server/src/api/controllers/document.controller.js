import * as documentService from '../services/document.service.js'

export async function listDocuments(req, res) {
  res.json(await documentService.listDocuments(req.query.type))
}

export async function getDocument(req, res) {
  res.json(await documentService.getDocument(req.params.key))
}

export async function saveDocument(req, res) {
  res.json(await documentService.saveDocument(req.params.key, req.body, req.query.type))
}

export async function deleteDocument(req, res) {
  await documentService.deleteDocument(req.params.key)
  res.status(204).end()
}
