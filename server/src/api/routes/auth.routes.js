import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', asyncHandler(controller.login))

export default router
