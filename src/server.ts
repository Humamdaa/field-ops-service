import express from 'express'
import { connectDB } from './config/db'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import technicianRouter from './modules/technician/technician.routes'
import serviceRequestRouter from './modules/serviceRequest/serviceRequest.routes'
import { errorHandler } from './shared/errors/errorHandler'

dotenv.config()

const app = express()

app.use(express.json())

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes ✅
app.use('/api/technicians', technicianRouter)
app.use('/api/service-requests', serviceRequestRouter)

// Error handler MUST be last ✅
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()