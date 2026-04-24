export const TechnicianStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export const TechnicianAvailability = {
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const

export const statusValues = Object.values(TechnicianStatus)
export const availabilityValues = Object.values(TechnicianAvailability)