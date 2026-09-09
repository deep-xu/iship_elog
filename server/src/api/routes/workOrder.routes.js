import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/workOrder.controller.js'

const router = Router()

// Declared before `/:woNo` so "history" is never read as a work order number.
router.get('/history/search', asyncHandler(controller.searchHistory))

router.get('/', asyncHandler(controller.listWorkOrders))
router.put('/:woNo', asyncHandler(controller.saveWorkOrder))
router.delete('/:woNo', asyncHandler(controller.deleteWorkOrder))

export default router
