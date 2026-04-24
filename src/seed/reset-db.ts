import mongoose from 'mongoose'

export const resetDatabase = async () => {
    const db = mongoose.connection.db

    if (!db) throw new Error('No DB connection')

    const collections = await db.collections()

    for (const collection of collections) {
        await collection.deleteMany({})
    }

    console.log('🗑️ All collections cleared')
}