import mongoose from 'mongoose'

const ServiceRequestSchema = new mongoose.Schema(
    {
        referenceNumber: { type: String, unique: true },

        customerName: String,
        customerPhone: String,

        area: String,
        fullAddress: String,

        category: String,

        location: {
            lat: Number,
            lng: Number,
        },

        priority: String,
        status: String,

        technicianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technician',
            default: null,
        },

        externalReference: { type: String, default: null },

    },
    { timestamps: true }
)

export const ServiceRequestModel = mongoose.model(
    'ServiceRequest',
    ServiceRequestSchema
)