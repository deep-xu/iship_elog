import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/maintenance.controller.js'

const router = Router()

router.get('/', asyncHandler(controller.listJobs))
router.put('/:jobNo', asyncHandler(controller.updateJob))

export default router
