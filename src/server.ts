import express from 'express'
import { connectDB } from './config/db'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import technicianRouter from './modules/technician/technician.routes'
import serviceRequestRouter from './modules/serviceRequest/serviceRequest.routes'
import { errorHandler } from './shared/errors/errorHandler'

import { Server } from 'socket.io'
import http from 'http'


dotenv.config()

const app = express()

app.use(express.json())

// socker.io setup 
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: '*' },
})

app.set('io', io)

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
})


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

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()