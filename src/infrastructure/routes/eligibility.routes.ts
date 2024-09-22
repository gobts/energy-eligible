import { eligibilityHandler } from '@application/useCases/eligibility'
import { Router } from 'express'

const eligibilityRoute = Router()

eligibilityRoute.post('/', async (req, res) => {
  await eligibilityHandler.executeImpl(req, res)
})

export { eligibilityRoute }
