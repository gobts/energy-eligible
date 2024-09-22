import { EligibleTariffModality } from '@helpers/eligibleTariffModality.helper'
import { ETariffTypes } from '@helpers/types'

describe('HELPERS/ELIGIBILITY_TARIFF', () => {
  it('Should be eligible tariff modality branca ok', () => {
    const tariffModality = EligibleTariffModality.validate(ETariffTypes.BRANCA)
    expect(tariffModality).toBeTruthy()
  })

  it('Should be eligible tariff modality Convencional ok', () => {
    const tariffModality = EligibleTariffModality.validate(
      ETariffTypes.CONVENCIONAL,
    )
    expect(tariffModality).toBeTruthy()
  })

  it('Should be not eligible tariff modality Convencional', () => {
    const tariffModality = EligibleTariffModality.validate(ETariffTypes.AZUL)
    expect(tariffModality).toBeFalsy()
  })
})
