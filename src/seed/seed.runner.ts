import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { seedTechnicians } from '../modules/technician/technician.seed'
import { resetDatabase } from './reset-db'
import { seedServiceRequests } from '../modules/serviceRequest/serviceRequest.seed'

dotenv.config()

const runSeeds = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)

        console.log('🚀 Running seeds...')
// reset all data
        await resetDatabase()

        // call seed 
        await seedTechnicians()
        await seedServiceRequests()

        console.log('✅ All seeds completed')

        await mongoose.disconnect()
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed failed:', err)
        process.exit(1)
    }
}

runSeeds()