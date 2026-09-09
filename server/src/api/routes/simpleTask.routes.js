import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import * as controller from '../controllers/simpleTask.controller.js'

const router = Router()

router.get('/', asyncHandler(controller.listTasks))
router.put('/', asyncHandler(controller.replaceTasks))
router.delete('/:id', asyncHandler(controller.deleteTask))

export default router
