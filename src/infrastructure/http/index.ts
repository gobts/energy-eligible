import { eligibilityRoute } from '@infrastructure/routes/eligibility.routes'
import { Router } from 'express'

const router = Router()

router.use('/eligibility', eligibilityRoute)

export default router
