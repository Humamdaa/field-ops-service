
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import technicianRoutes from './modules/technician/technician.routes'
import serviceRequestRoutes from './modules/serviceRequest/serviceRequest.routes'
import { errorHandler } from './shared/errors/errorHandler'

const app = express()

// Middlewares
app.use(express.json())

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use('/api/technicians', technicianRoutes)
app.use('/api/service-requests', serviceRequestRoutes)

// Error handler (must be last)
app.use(errorHandler)

export default app