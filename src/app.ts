import express from 'express'
import technicianRoutes from './modules/technician/technician.routes'
import serviceRequestRoutes from './modules/serviceRequest/serviceRequest.routes'
import assignmentRoutes from './modules/assignment/assignment.routes'
import partnerRoutes from './modules/partner/partner.routes'
import { errorHandler } from './shared/errors/errorHandler'

const app = express()

app.use(express.json())

app.use('/api/technicians', technicianRoutes)
app.use('/api/service-requests', serviceRequestRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/partner/v1', partnerRoutes)

app.use(errorHandler)

export default app