import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/document.controller.js'

const router = Router()

router.get('/', asyncHandler(controller.listDocuments))
router.get('/:key', asyncHandler(controller.getDocument))
router.put('/:key', asyncHandler(controller.saveDocument))
router.delete('/:key', asyncHandler(controller.deleteDocument))

export default router
