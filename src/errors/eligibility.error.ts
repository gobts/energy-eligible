export namespace EligibilityError {
  export class ValidationError {
    private elegivel: boolean
    private razoesDeInelegibilidade: string[]

    constructor(errorData: {
      isValidTheClasses: boolean
      isValidTariffModality: boolean
      isMinimalConsumptionValid: boolean
    }) {
      const errorMessages: string[] = []
      if (!errorData.isValidTheClasses)
        errorMessages.push('Classe de consumo não aceita')
      if (!errorData.isValidTariffModality)
        errorMessages.push('Modalidade tarifária não aceita')
      if (!errorData.isMinimalConsumptionValid)
        errorMessages.push('Consumo muito baixo para tipo de conexão')

      this.elegivel = false
      this.razoesDeInelegibilidade = errorMessages
    }

    getErrorValue() {
      return {
        elegivel: this.elegivel,
        razoesDeInelegibilidade: this.razoesDeInelegibilidade,
      }
    }
  }
}
