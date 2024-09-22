import { EligibilityUseCase } from '../useCase'
import { EConsumptionClass, ETariffTypes } from '@helpers/types'
import { CustomerConsumption } from '@helpers/customerConsumption.helper'
import { GenericErrors } from '@error/generic.error'

const dtoMock = {
  numeroDoDocumento: '14041737706',
  tipoDeConexao: 'bifasico',
  classeDeConsumo: 'comercial',
  modalidadeTarifaria: 'branca',
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
  ],
}

describe('APPLICATION/USE_CASES/USE_CASE', () => {
  const useCase = new EligibilityUseCase()

  const useCaseMock = {
    elegivel: true,
    economiaAnualDeCO2: 4584.04,
  }

  const expectedErrorMock = {
    elegivel: false,
    razoesDeInelegibilidade: ['Classe de consumo não aceita'],
  }

  it('Should be the customer is eligible OK', async () => {
    const result = await useCase.execute(dtoMock)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.getValue()).toStrictEqual(useCaseMock)
  })

  it('Should be the customer is eligible using cnpj OK', async () => {
    const mock = {
      ...dtoMock,
      numeroDoDocumento: '38295903000110',
    }
    const result = await useCase.execute(mock)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.getValue()).toStrictEqual(useCaseMock)
  })

  it('Should error on dto validation document number is null', async () => {
    const mock = {
      ...dtoMock,
      numeroDoDocumento: null as unknown as EConsumptionClass,
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      errors: ['Numero de document é requerido!'],
    })
  })

  it('Should error on dto validation', async () => {
    const mock = {
      ...dtoMock,
      classeDeConsumo: null as unknown as EConsumptionClass,
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      errors: ['classeDeConsumo cannot be null'],
    })
  })

  it('Should error on dto validation consumption history min', async () => {
    const mock = {
      ...dtoMock,
      historicoDeConsumo: [123],
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      errors: ['Minima quantidades de leituras: 3 ultimas leituras'],
    })
  })

  it('Should error on validation consumption not eligible', async () => {
    const mock = {
      ...dtoMock,
      historicoDeConsumo: [123, 1, 2],
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      elegivel: false,
      razoesDeInelegibilidade: ['Consumo muito baixo para tipo de conexão'],
    })
  })

  it('Should error consumption class rural not eligible', async () => {
    const mock = {
      ...dtoMock,
      classeDeConsumo: EConsumptionClass.RURAL,
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual(expectedErrorMock)
  })

  it('Should error not eligible because tariff modality', async () => {
    const mock = {
      ...dtoMock,
      modalidadeTarifaria: ETariffTypes.AZUL,
    }
    const result = await useCase.execute(mock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      elegivel: false,
      razoesDeInelegibilidade: ['Modalidade tarifária não aceita'],
    })
  })

  it('Should unexpected error', async () => {
    const mockFunction = jest
      .spyOn(CustomerConsumption, 'calcCO2Savings')
      .mockImplementationOnce(() => {
        throw new Error('Some Error')
      })
    const result = await useCase.execute(dtoMock)
    const errorValue = result.getValue() as GenericErrors.ValidationError

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()

    expect(errorValue.getErrorValue()).toStrictEqual({
      errors: ['Unexpected Error: Some Error'],
    })

    mockFunction.mockReset()
  })
})
