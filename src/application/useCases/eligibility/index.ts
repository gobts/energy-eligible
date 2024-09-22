import { EligibilityHandler } from './handler'
import { EligibilityUseCase } from './useCase'

const eligibilityUseCase = new EligibilityUseCase()

const eligibilityHandler = new EligibilityHandler(eligibilityUseCase)

export { eligibilityHandler }
