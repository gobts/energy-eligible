import { calculateAverage, calculateTotal } from '@utils/calculateAverage'

describe('UTILS/CALCULATE_AVERAGE', () => {
  const numbersMock = [2000, 3000, 400]

  it('Should be calc average of number array ok', () => {
    const average = calculateAverage(numbersMock)
    expect(average).toBe(1800)
  })

  it('Should be sum array of numbers ok', () => {
    const tariffModality = calculateTotal(numbersMock)
    expect(tariffModality).toBe(5400)
  })
})
