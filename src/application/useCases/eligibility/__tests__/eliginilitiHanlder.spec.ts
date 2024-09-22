import { Either, left, right } from '@core/either'
import { EligibilityHandler } from '../handler'
import { EligibilityUseCase, Result } from '../useCase'
import { StatusCodes } from 'http-status-codes'
import { EligibilityError } from '@error/eligibility.error'
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

const reqMock = {
  body: dtoMock,
}

describe('APPLICATION/USE_CASES/HANDLER', () => {
  const resMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }
  const useCase = new EligibilityUseCase()
  const handler = new EligibilityHandler(useCase)

  let useCaseSpy: jest.SpyInstance

  const useCaseMock = {
    elegivel: true,
    economiaAnualDeCO2: 4584.04,
  }

  const expectedErrorMock = {
    elegivel: false,
    razoesDeInelegibilidade: ['Classe de consumo não aceita'],
  }

  beforeEach(() => {
    useCaseSpy = jest
      .spyOn(useCase, 'execute')
      .mockImplementationOnce(async (): Promise<Result> => {
        return right(useCaseMock)
      })

    resMock.status = jest.fn().mockReturnThis()
    resMock.json = jest.fn()
  })

  afterEach(() => {
    useCaseSpy.mockReset()
    resMock.json.mockReset()
    resMock.status.mockReset()
  })

  it('Should be the customer is eligible OK', async () => {
    await handler.executeImpl(reqMock, resMock)

    expect(useCaseSpy).toHaveBeenCalled()
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
    expect(useCaseSpy).toHaveBeenCalledWith(dtoMock)
    expect(resMock.status).toHaveBeenCalledTimes(1)
    expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(resMock.json).toHaveBeenCalledTimes(1)
    expect(resMock.json).toHaveBeenCalledWith(useCaseMock)
  })

  it('Should be the customer is not eligible', async () => {
    useCaseSpy.mockReset()
    useCaseSpy = jest
      .spyOn(useCase, 'execute')
      .mockImplementationOnce(async (): Promise<Result> => {
        return left(
          new EligibilityError.ValidationError({
            isMinimalConsumptionValid: true,
            isValidTariffModality: true,
            isValidTheClasses: false,
          }),
        )
      })

    await handler.executeImpl(reqMock, resMock)

    expect(useCaseSpy).toHaveBeenCalled()
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
    expect(useCaseSpy).toHaveBeenCalledWith(dtoMock)
    expect(resMock.status).toHaveBeenCalledTimes(1)
    expect(resMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(resMock.json).toHaveBeenCalledTimes(1)
    expect(resMock.json).toHaveBeenCalledWith(expectedErrorMock)
  })

  it('Should be error in dto validation', async () => {
    useCaseSpy.mockReset()
    useCaseSpy = jest
      .spyOn(useCase, 'execute')
      .mockImplementationOnce(async (): Promise<Result> => {
        return left(new GenericErrors.ValidationError(['Documento invalido!']))
      })

    await handler.executeImpl(reqMock, resMock)

    expect(useCaseSpy).toHaveBeenCalled()
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
    expect(useCaseSpy).toHaveBeenCalledWith(dtoMock)
    expect(resMock.status).toHaveBeenCalledTimes(1)
    expect(resMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(resMock.json).toHaveBeenCalledTimes(1)
    expect(resMock.json).toHaveBeenCalledWith({
      errors: ['Documento invalido!'],
    })
  })

  it('Should be Unexpected Error', async () => {
    useCaseSpy.mockReset()
    useCaseSpy = jest
      .spyOn(useCase, 'execute')
      .mockImplementationOnce(async (): Promise<Result> => {
        return left(new GenericErrors.UnexpectedError(new Error('some Error')))
      })

    await handler.executeImpl(reqMock, resMock)

    expect(useCaseSpy).toHaveBeenCalled()
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
    expect(useCaseSpy).toHaveBeenCalledWith(dtoMock)
    expect(resMock.status).toHaveBeenCalledTimes(1)
    expect(resMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR,
    )
    expect(resMock.json).toHaveBeenCalledTimes(1)
    expect(resMock.json).toHaveBeenCalledWith({
      errors: ['Unexpected Error: some Error'],
    })
  })
})
