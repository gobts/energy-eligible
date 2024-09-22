import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const { combine, timestamp, label, printf, colorize, json } = format

const environment = process.env.NODE_ENV || 'development'

const devFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const prodFormat = json()

const Logger = (logLabel: string) => {
  return createLogger({
    level: environment === 'development' ? 'debug' : 'info',
    format: combine(
      label({ label: logLabel }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      environment === 'development' ? colorize() : format.uncolorize(),
      environment === 'development' ? devFormat : prodFormat,
    ),
    transports: [
      new transports.Console(),

      ...(environment === 'production'
        ? [
            new transports.DailyRotateFile({
              filename: 'logs/application-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '3d',
            }),
          ]
        : []),
    ],
  })
}

export default Logger
