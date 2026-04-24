import { ServiceRequestModel } from './serviceRequest.model'
import {
  ServiceRequestStatus,
  ServiceRequestPriority,
} from './serviceRequest.enums'
import { TechnicianModel } from '../technician/technician.model'

export const seedServiceRequests = async () => {
  await ServiceRequestModel.deleteMany({})

  const techs = await TechnicianModel.find()

  const now = new Date()

  const data = [
    // -------- PENDING (no technician)
    ...Array.from({ length: 5 }).map((_, i) => ({
      referenceNumber: `SR-00000${i + 1}`,
      customerName: `Customer Pending ${i + 1}`,
      customerPhone: `+10000000${i}`,
      area: ['Downtown', 'North', 'West'][i % 3],
      fullAddress: `Street ${i + 1}`,
      category: ['plumbing', 'electric', 'hvac'][i % 3],
      location: { lat: 30 + i * 0.1, lng: 31 + i * 0.1 },
      priority: [
        ServiceRequestPriority.LOW,
        ServiceRequestPriority.MEDIUM,
        ServiceRequestPriority.HIGH,
      ][i % 3],
      status: ServiceRequestStatus.PENDING,
      technicianId: null,
      createdAt: new Date(2026, 0, i + 1),
      updatedAt: new Date(2026, 0, i + 1),
    })),

    // -------- ASSIGNED
    ...Array.from({ length: 5 }).map((_, i) => ({
      referenceNumber: `SR-00001${i + 1}`,
      customerName: `Customer Assigned ${i + 1}`,
      customerPhone: `+20000000${i}`,
      area: ['East', 'South', 'Downtown'][i % 3],
      fullAddress: `Street ${i + 10}`,
      category: ['plumbing', 'electric', 'hvac'][i % 3],
      location: { lat: 30.5 + i * 0.1, lng: 31.5 + i * 0.1 },
      priority: [
        ServiceRequestPriority.HIGH,
        ServiceRequestPriority.MEDIUM,
        ServiceRequestPriority.LOW,
      ][i % 3],
      status: ServiceRequestStatus.ASSIGNED,
      technicianId: techs?.[i % techs.length]?._id || null,
      createdAt: new Date(2026, 0, i + 6),
      updatedAt: new Date(2026, 0, i + 6),
    })),

    // -------- IN_PROGRESS
    ...Array.from({ length: 4 }).map((_, i) => ({
      referenceNumber: `SR-00002${i + 1}`,
      customerName: `Customer Progress ${i + 1}`,
      customerPhone: `+30000000${i}`,
      area: ['North', 'West', 'East'][i % 3],
      fullAddress: `Street ${i + 20}`,
      category: ['hvac', 'plumbing', 'electric'][i % 3],
      location: { lat: 30.8 + i * 0.1, lng: 31.8 + i * 0.1 },
      priority: [
        ServiceRequestPriority.MEDIUM,
        ServiceRequestPriority.HIGH,
        ServiceRequestPriority.LOW,
      ][i % 3],
      status: ServiceRequestStatus.IN_PROGRESS,
      technicianId: techs?.[i % techs.length]?._id || null,
      createdAt: new Date(2026, 0, i + 11),
      updatedAt: new Date(2026, 0, i + 12),
    })),

    // -------- COMPLETED
    ...Array.from({ length: 4 }).map((_, i) => ({
      referenceNumber: `SR-00003${i + 1}`,
      customerName: `Customer Completed ${i + 1}`,
      customerPhone: `+40000000${i}`,
      area: ['South', 'Downtown', 'North'][i % 3],
      fullAddress: `Street ${i + 30}`,
      category: ['electric', 'hvac', 'plumbing'][i % 3],
      location: { lat: 31 + i * 0.1, lng: 32 + i * 0.1 },
      priority: [
        ServiceRequestPriority.LOW,
        ServiceRequestPriority.MEDIUM,
        ServiceRequestPriority.HIGH,
      ][i % 3],
      status: ServiceRequestStatus.COMPLETED,
      technicianId: techs?.[i % techs.length]?._id || null,
      createdAt: new Date(2026, 0, i + 15),
      updatedAt: new Date(2026, 0, i + 16),
    })),

    // -------- CANCELLED
    ...Array.from({ length: 3 }).map((_, i) => ({
      referenceNumber: `SR-00004${i + 1}`,
      customerName: `Customer Cancelled ${i + 1}`,
      customerPhone: `+50000000${i}`,
      area: ['West', 'East', 'South'][i % 3],
      fullAddress: `Street ${i + 40}`,
      category: ['plumbing', 'hvac', 'electric'][i % 3],
      location: { lat: 31.5 + i * 0.1, lng: 32.5 + i * 0.1 },
      priority: [
        ServiceRequestPriority.HIGH,
        ServiceRequestPriority.LOW,
        ServiceRequestPriority.MEDIUM,
      ][i % 3],
      status: ServiceRequestStatus.CANCELLED,
      technicianId: null,
      createdAt: new Date(2026, 0, i + 18),
      updatedAt: new Date(2026, 0, i + 19),
    })),
  ]

  await ServiceRequestModel.insertMany(data)

  console.log('🌱 Service Requests seeded (21 records)')
}