// Mounts every domain router under /api. Adding a domain means adding one
// import and one line here.
import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { getHealth } from '../controllers/health.controller.js'

import authRoutes from './auth.routes.js'
import equipmentRoutes from './equipment.routes.js'
import maintenanceRoutes from './maintenance.routes.js'
import standardJobRoutes from './standardJob.routes.js'
import workOrderRoutes from './workOrder.routes.js'
import simpleTaskRoutes from './simpleTask.routes.js'
import runningHoursRoutes from './runningHours.routes.js'
import certificateRoutes from './certificate.routes.js'
import sparePartRoutes from './sparePart.routes.js'
import documentRoutes from './document.routes.js'

const router = Router()

router.get('/health', asyncHandler(getHealth))

router.use('/auth', authRoutes)
router.use('/equipment', equipmentRoutes)
router.use('/maintenance-plan', maintenanceRoutes)
router.use('/standard-jobs', standardJobRoutes)
router.use('/work-orders', workOrderRoutes)
router.use('/simple-tasks', simpleTaskRoutes)
router.use('/running-hours', runningHoursRoutes)
router.use('/certificates', certificateRoutes)
router.use('/spare-parts', sparePartRoutes)
router.use('/documents', documentRoutes)

export default router
