import Logger from '@core/logger'
import winston from 'winston'

export abstract class BaseUseCase<TDto = unknown, KResponse = unknown> {
  constructor(label: string) {
    this.logger = Logger(label)
  }
  abstract execute(dto: TDto): Promise<KResponse>
  public logger: winston.Logger
}
