import { CustomerConsumption } from '@helpers/customerConsumption.helper'
import { EConnectionType, EConsumptionClass } from '@helpers/types'

describe('HELPERS/CUSTOMER_CONSUMPTION', () => {
  const consumptionMock = [3878, 9760, 5976]
  it('Should be class residencial validation ok', () => {
    const isClassesValid = CustomerConsumption.validateClasses(
      EConsumptionClass.RESIDENCIAL,
    )
    expect(isClassesValid).toBeTruthy()
  })

  it('Should be class comercial validation ok', () => {
    const isClassesValid = CustomerConsumption.validateClasses(
      EConsumptionClass.COMERCIAL,
    )
    expect(isClassesValid).toBeTruthy()
  })

  it('Should be class industrial validation ok', () => {
    const isClassesValid = CustomerConsumption.validateClasses(
      EConsumptionClass.INDUSTRIAL,
    )
    expect(isClassesValid).toBeTruthy()
  })

  it('Should be class rural validation is false', () => {
    const isClassesValid = CustomerConsumption.validateClasses(
      EConsumptionClass.RURAL,
    )
    expect(isClassesValid).toBeFalsy()
  })

  it('Should be minimal consumptions MONOFACICO Ok', () => {
    const isMinimalConsumption = CustomerConsumption.minConsumptionValidator(
      consumptionMock,
      EConnectionType.MONOFACICO,
    )
    expect(isMinimalConsumption).toBeTruthy()
  })

  it('Should be minimal consumptions MONOFACICO is not Ok', () => {
    const isMinimalConsumption = CustomerConsumption.minConsumptionValidator(
      [234],
      EConnectionType.MONOFACICO,
    )
    expect(isMinimalConsumption).toBeFalsy()
  })

  it('Should be minimal consumptions BIFASICO Ok', () => {
    const isMinimalConsumption = CustomerConsumption.minConsumptionValidator(
      [234, 1000],
      EConnectionType.BIFASICO,
    )
    expect(isMinimalConsumption).toBeTruthy()
  })

  it('Should be minimal consumptions BIFASICO not Ok', () => {
    const isMinimalConsumption = CustomerConsumption.minConsumptionValidator(
      [234, 100],
      EConnectionType.BIFASICO,
    )
    expect(isMinimalConsumption).toBeFalsy()
  })

  it('Should be minimal consumptions TRIFASICO  Ok', () => {
    const isMinimalConsumption = CustomerConsumption.minConsumptionValidator(
      [1000, 1000, 1111],
      EConnectionType.TRIFASICO,
    )
    expect(isMinimalConsumption).toBeTruthy()
  })

  it('Should be calc the CO2Saving Ok', () => {
    const isMinimalConsumption = CustomerConsumption.calcCO2Savings([
      1000, 1000,
    ])
    expect(isMinimalConsumption).toBe(168)
  })
})
