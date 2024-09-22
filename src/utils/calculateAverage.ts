import BigNumber from 'bignumber.js'

export const calculateAverage = (values: number[]) => {
  const sumValues = values.reduce(
    (acc, value) => acc.plus(value),
    new BigNumber(0),
  )
  return sumValues.dividedBy(values.length).toNumber()
}

export const calculateTotal = (values: number[]) =>
  values.reduce((acc, value) => acc.plus(value), new BigNumber(0)).toNumber()
