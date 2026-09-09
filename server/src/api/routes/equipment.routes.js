import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/equipment.controller.js'

const router = Router()

router.get('/tree', asyncHandler(controller.getTree))
router.get('/additions', asyncHandler(controller.listAdditions))

router.post('/nodes', asyncHandler(controller.createNode))
router.delete('/nodes/:id', asyncHandler(controller.deleteNode))

router.get('/counter-allowed', asyncHandler(controller.getCounterAllowed))
router.put('/counter-allowed', asyncHandler(controller.setCounterAllowed))

export default router
