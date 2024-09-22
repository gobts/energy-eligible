export interface EligibilityDTO {
  numeroDoDocumento: string
  tipoDeConexao: string
  classeDeConsumo: string
  modalidadeTarifaria: string
  historicoDeConsumo: number[]
}

export interface ResponseEligibilityDTO {
  elegivel: boolean
  economiaAnualDeCO2: number
}

export interface ErrorResponseEligibilityDTO {
  elegivel: boolean
  razoesDeInelegibilidade: string[]
}

export type TRequestEligibility = {
  body: EligibilityDTO
} & Request
