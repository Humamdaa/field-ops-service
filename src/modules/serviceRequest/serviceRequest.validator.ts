import { z } from 'zod'
import {
  ServiceRequestStatusValues,
  ServiceRequestPriorityValues,
} from './serviceRequest.enums'

export const updateServiceRequestSchema = z.object({
  customerName: z.string().min(1).max(50).optional(),
  customerPhone: z.string().min(7).max(20).optional(),

  area: z.string().optional(),
  fullAddress: z.string().optional(),
  category: z.string().optional(),

  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),

  priority: z.enum(ServiceRequestPriorityValues).optional(),
}).strict()


export const createServiceRequestSchema = z.object({
  referenceNumber: z.string().optional(),

  customerName: z.string().min(1).max(50),
  customerPhone: z.string().min(7).max(20),

  area: z.string().optional(),
  fullAddress: z.string().optional(),
  category: z.string().optional(),

  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),

  priority: z.enum(ServiceRequestPriorityValues).optional(),

  externalReference: z.string().optional(),
}).strict()

export const updateServiceRequestStatus = z.object({
  status: z.enum(ServiceRequestStatusValues),
}).strict()