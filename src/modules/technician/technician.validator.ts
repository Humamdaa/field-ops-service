import { z } from 'zod'
import {
  statusValues,
  availabilityValues,
} from './technician.enums'

export const createTechnicianSchema = z.object({
  name: z.string().min(1).max(20),
  phone: z.string().min(7).max(15),
  skills: z.array(z.string()).optional(),

  status: z.enum(statusValues).optional(),
  availability: z.enum(availabilityValues).optional(),
})


export const updateLocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
})

export const updateTechnicianSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(7).optional(),
  skills: z.array(z.string()).optional(),
})


export const updateStatusSchema = z.object({
  status: z.enum(statusValues),
})