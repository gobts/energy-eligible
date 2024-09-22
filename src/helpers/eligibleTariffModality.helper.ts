import { ETariffTypes, threePhaseModeEligible } from './types'

export class EligibleTariffModality {
  public static validate(type: ETariffTypes) {
    return threePhaseModeEligible.includes(type)
  }
}
