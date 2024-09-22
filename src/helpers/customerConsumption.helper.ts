import { calculateAverage, calculateTotal } from '@utils/calculateAverage'
import {
  consumptionClassesEligible,
  EConnectionType,
  EConsumptionClass,
  getMinimalConsumptionByType,
} from './types'
import BigNumber from 'bignumber.js'
import { KWH_BY_CO2 } from '@constants/consumptionCO2.constant'
import { DECIMAL_PLACES } from '@constants/minimalConsumption.constant'

export class CustomerConsumption {
  public static validateClasses(consumptionClass: EConsumptionClass) {
    return consumptionClassesEligible.includes(consumptionClass)
  }

  public static minConsumptionValidator(
    consumptions: number[],
    connectionType: EConnectionType,
  ) {
    const minimalConsumption = getMinimalConsumptionByType(connectionType)
    const averageConsumption = calculateAverage(consumptions)
    return averageConsumption >= minimalConsumption
  }

  public static calcCO2Savings(consumptions: number[]): number {
    const sumCO2Consumption = new BigNumber(calculateTotal(consumptions))
    const co2Saving = sumCO2Consumption
      .dividedBy(KWH_BY_CO2)
      .decimalPlaces(DECIMAL_PLACES, BigNumber.ROUND_DOWN)

    return co2Saving.toNumber()
  }
}
