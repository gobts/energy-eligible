import { BaseHandler } from '@core/shared/BaseHandler'
import { Response } from 'express'
import { EligibilityUseCase } from './useCase'
import { TRequestEligibility } from '@dto/eligibility.dto'
import { GenericErrors } from '@error/generic.error'
import { EligibilityError } from '@error/eligibility.error'

export class EligibilityHandler extends BaseHandler<
  TRequestEligibility,
  unknown
> {
  constructor(protected readonly useCase: EligibilityUseCase) {
    super('EligibilityHandler')
  }

  async execute(req: TRequestEligibility, res: Response): Promise<unknown> {
    const result = await this.useCase.execute(req.body)

    this.logger.debug('Start Eligibility Handler')
    if (result.isLeft()) {
      const errorValue = result.getValue()

      if (errorValue instanceof GenericErrors.UnexpectedError) {
        this.logger.error(JSON.stringify(errorValue.getErrorValue()))
        return this.unexpectedError(res, errorValue.getErrorValue())
      }

      if (errorValue instanceof GenericErrors.ValidationError) {
        this.logger.error(JSON.stringify(errorValue.getErrorValue()))
        return this.conflict(res, errorValue.getErrorValue())
      }

      if (errorValue instanceof EligibilityError.ValidationError) {
        this.logger.error(JSON.stringify(errorValue.getErrorValue()))
        return this.conflict(res, errorValue.getErrorValue())
      }
    }
    this.logger.debug('Finish with success!')

    return this.ok(res, result.getValue())
  }
}
