import Logger from '@core/logger'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import winston from 'winston'

export abstract class BaseHandler<RequestHandler = Request, T = unknown> {
  constructor(label: string) {
    this.logger = Logger(label)
  }
  async executeImpl(req, res) {
    await this.execute(req, res)
  }

  public logger: winston.Logger

  abstract execute(req: RequestHandler, res: Response): Promise<T>

  ok<T = unknown>(res: Response, data?: T) {
    if (!data) return res.sendStatus(StatusCodes.NO_CONTENT)
    return res.status(StatusCodes.OK).json(data)
  }

  unexpectedError<T = unknown>(res: Response, data?: T) {
    if (!data) return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(data)
  }

  conflict<T = unknown>(res: Response, data?: T) {
    if (!data) return res.sendStatus(StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(data)
  }
}
