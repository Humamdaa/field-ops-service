import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { connectDB } from './config/db'
import app from './app'

dotenv.config()

const server = http.createServer(app)

// Socket.io
const io = new Server(server, {
  cors: { origin: '*' },
})

app.set('io', io)

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
})

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