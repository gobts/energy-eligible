import { EConnectionType, getMinimalConsumptionByType } from '@helpers/types'
import {
  BIPHASIC,
  SINGLE_PHASE,
  THREE_PHASE,
} from '@constants/minimalConsumption.constant'

describe('HELPERS/TYPES', () => {
  it('Should get minimal consumptions type SINGLE_PHASE Ok', () => {
    const minimalConsumptions = getMinimalConsumptionByType(
      EConnectionType.MONOFACICO,
    )
    expect(minimalConsumptions).toBe(SINGLE_PHASE)
  })

  it('Should get minimal consumptions type BIPHASIC Ok', () => {
    const minimalConsumptions = getMinimalConsumptionByType(
      EConnectionType.BIFASICO,
    )
    expect(minimalConsumptions).toBe(BIPHASIC)
  })

  it('Should get minimal consumptions type THREE_PHASE Ok', () => {
    const minimalConsumptions = getMinimalConsumptionByType(
      EConnectionType.TRIFASICO,
    )
    expect(minimalConsumptions).toBe(THREE_PHASE)
  })
})
