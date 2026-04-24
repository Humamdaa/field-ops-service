export const ServiceRequestStatus = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const ServiceRequestPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

export const ServiceRequestStatusValues = Object.values(ServiceRequestStatus)
export const ServiceRequestPriorityValues = Object.values(ServiceRequestPriority)