import mongoose from 'mongoose'

const TechnicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: [String], default: [] },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    availability: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },

    currentLocation: {
      lat: Number,
      lng: Number,
      updatedAt: String,
    },
  },
  { timestamps: true }
)

export const TechnicianModel = mongoose.model('Technician', TechnicianSchema)