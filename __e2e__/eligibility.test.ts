import request from 'supertest'
import app from '../src/main'
import { StatusCodes } from 'http-status-codes'

describe('E2E/ELIGIBILITY', () => {
  const payloadMock = {
    numeroDoDocumento: '14041737706',
    tipoDeConexao: 'bifasico',
    classeDeConsumo: 'comercial',
    modalidadeTarifaria: 'convencional',
    historicoDeConsumo: [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ],
  }

  const expectedOkValue = { economiaAnualDeCO2: 5553.24, elegivel: true }

  it('Should be the customer is eligible!', async () => {
    const response = await request(app)
      .post('/api/eligibility')
      .send(payloadMock)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toEqual(expectedOkValue)
  })

  it('Should be the customer is not eligible because consumption class is rural!', async () => {
    const mock = {
      ...payloadMock,
      classeDeConsumo: 'rural',
    }
    const response = await request(app).post('/api/eligibility').send(mock)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: ['Classe de consumo não aceita'],
    })
  })

  it('Should be the customer is not eligible because tariff type is AZUL!', async () => {
    const mock = {
      ...payloadMock,
      modalidadeTarifaria: 'azul',
    }
    const response = await request(app).post('/api/eligibility').send(mock)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: ['Modalidade tarifária não aceita'],
    })
  })

  it('Should be the customer is not eligible because consumption history is less than 3!', async () => {
    const mock = {
      ...payloadMock,
      historicoDeConsumo: [123, 11],
    }
    const response = await request(app).post('/api/eligibility').send(mock)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual({
     errors: ['Minima quantidades de leituras: 3 ultimas leituras'],
    })
  })

  it('Should be the customer is not eligible because consumption history average is less than required!', async () => {
    const mock = {
      ...payloadMock,
      historicoDeConsumo: [123, 11, 134],
    }
    const response = await request(app).post('/api/eligibility').send(mock)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: ['Consumo muito baixo para tipo de conexão'],
    })
  })
})
