import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/userRoute'

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use('/', userRoutes)

export default app