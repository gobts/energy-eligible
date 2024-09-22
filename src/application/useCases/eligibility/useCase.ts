import { BaseUseCase } from '@core/shared/BaseUseCase'
import { EligibilityDTO, ResponseEligibilityDTO } from '@dto/eligibility.dto'
import { validateEligibility } from './validator'
import { CustomerConsumption } from '@helpers/customerConsumption.helper'
import {
  EConnectionType,
  EConsumptionClass,
  ETariffTypes,
} from '@helpers/types'
import { EligibleTariffModality } from '@helpers/eligibleTariffModality.helper'
import { Either, left, right } from '@core/either'
import { GenericErrors } from '@error/generic.error'
import { EligibilityError } from '@error/eligibility.error'

export type Result = Either<
  | GenericErrors.UnexpectedError
  | EligibilityError.ValidationError
  | GenericErrors.ValidationError,
  ResponseEligibilityDTO
>

export class EligibilityUseCase extends BaseUseCase<EligibilityDTO, any> {
  constructor() {
    super('EligibilityUseCase')
  }

  async execute(dto: EligibilityDTO): Promise<Result> {
    this.logger.debug('Start Use Case')

    try {
      await validateEligibility(dto)
    } catch (error: any) {
      this.logger.error('Validation dto Error!')
      return left(new GenericErrors.ValidationError(error.errors))
    }

    try {
      const isValidTheClasses = CustomerConsumption.validateClasses(
        EConsumptionClass[dto.classeDeConsumo.toUpperCase()],
      )
      const isValidTariffModality = EligibleTariffModality.validate(
        ETariffTypes[dto.modalidadeTarifaria.toUpperCase()],
      )
      const isMinimalConsumptionValid =
        CustomerConsumption.minConsumptionValidator(
          dto.historicoDeConsumo,
          EConnectionType[dto.tipoDeConexao.toUpperCase()],
        )

      if (
        !isValidTheClasses ||
        !isValidTariffModality ||
        !isMinimalConsumptionValid
      ) {
        this.logger.error('Customer is not eligible!')

        return left(
          new EligibilityError.ValidationError({
            isValidTheClasses,
            isValidTariffModality,
            isMinimalConsumptionValid,
          }),
        )
      }

      const co2Saved = CustomerConsumption.calcCO2Savings(
        dto.historicoDeConsumo,
      )

      this.logger.debug(`CO2 Saved: ${co2Saved}`)

      this.logger.debug('End useCase With Success!')
      return right<ResponseEligibilityDTO>({
        elegivel: true,
        economiaAnualDeCO2: co2Saved,
      })
    } catch (error) {
      return left(new GenericErrors.UnexpectedError(error))
    }
  }
}
