export class Left<L> {
  constructor(private readonly value: L) {}

  isLeft(): boolean {
    return true
  }

  isRight(): boolean {
    return false
  }

  getValue(): L {
    return this.value
  }
}

export class Right<R> {
  constructor(private readonly value: R) {}

  isLeft(): boolean {
    return false
  }

  isRight(): boolean {
    return true
  }

  getValue(): R {
    return this.value
  }
}

export type Either<L, R> = Left<L> | Right<R>

export function left<L, R>(value: L): Either<L, R> {
  return new Left(value)
}

export function right<R, L = any>(value: R): Either<L, R> {
  return new Right(value)
}
