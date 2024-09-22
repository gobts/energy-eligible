export namespace GenericErrors {
  export class UnexpectedError extends Error {
    constructor(error) {
      super(`Unexpected Error: ${error.message}`)
    }

    getErrorValue() {
      return {
        errors: [this.message],
      }
    }
  }

  export class ValidationError {
    private errors: string[]
    constructor(error: string[]) {
      this.errors = error
    }

    getErrorValue() {
      return {
        errors: this.errors,
      }
    }
  }
}
