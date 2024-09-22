import router from '@infrastructure/http'
import express from 'express'

const app = express()

app.use(express.json())

app.use('/api', router)

export default app
