import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/certificate.controller.js'

const router = Router()

router.get('/vessel', asyncHandler(controller.listVessel))
router.post('/vessel', asyncHandler(controller.createVessel))
router.put('/vessel/:id', asyncHandler(controller.updateVessel))
router.delete('/vessel/:id', asyncHandler(controller.deleteVessel))

router.get('/survey', asyncHandler(controller.listSurvey))
router.put('/survey/:id', asyncHandler(controller.saveSurvey))

export default router
