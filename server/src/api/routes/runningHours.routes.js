import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/runningHours.controller.js'

const router = Router()

router.get('/', asyncHandler(controller.getState))
router.put('/', asyncHandler(controller.replaceState))

export default router
