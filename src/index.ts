import Logger from '@core/logger'
import app from './main'

const logger = Logger('APP')

const PORT = 3000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
