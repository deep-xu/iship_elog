import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/sparePart.controller.js'

const router = Router()

router.get('/', asyncHandler(controller.listParts))
router.put('/:partNo/stock', asyncHandler(controller.updateStock))

export default router
