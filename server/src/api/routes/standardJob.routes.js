import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/standardJob.controller.js'

const router = Router()

// Declared before `/:jobNo` so "related" is never read as a job number.
router.get('/related/all', asyncHandler(controller.listRelatedJobs))
router.put('/related/:sourceKey', asyncHandler(controller.replaceRelatedJobs))

router.get('/', asyncHandler(controller.listJobs))
router.get('/:jobNo', asyncHandler(controller.getJob))
router.put('/:jobNo', asyncHandler(controller.saveJob))

export default router
