import { TechnicianModel } from './technician.model'
import {
  TechnicianStatus,
  TechnicianAvailability,
} from './technician.enums'

export const seedTechnicians = async () => {
  await TechnicianModel.deleteMany({})

  await TechnicianModel.insertMany([
    {
      name: 'John Doe',
      phone: '+111111111',
      skills: ['electric', 'wiring'],
      status: TechnicianStatus.ACTIVE,
      availability: TechnicianAvailability.ONLINE,
      currentLocation: {
        lat: 51.9225,
        lng: 4.47917,
        updatedAt: new Date().toISOString(),
      },
    },
    {
      name: 'Jane Smith',
      phone: '+222222222',
      skills: ['plumbing'],
      status: TechnicianStatus.ACTIVE,
      availability: TechnicianAvailability.OFFLINE,
      currentLocation: {
        lat: 51.9244,
        lng: 4.4777,
        updatedAt: new Date().toISOString(),
      },
    },
    {
      name: 'Ahmed Ali',
      phone: '+333333333',
      skills: ['hvac', 'maintenance'],
      status: TechnicianStatus.ACTIVE,
      availability: TechnicianAvailability.ONLINE,
      currentLocation: {
        lat: 51.9211,
        lng: 4.4832,
        updatedAt: new Date().toISOString(),
      },
    },
    {
      name: 'Sara Johnson',
      phone: '+444444444',
      skills: ['electric', 'solar'],
      status: TechnicianStatus.INACTIVE,
      availability: TechnicianAvailability.OFFLINE,
      currentLocation: {
        lat: 51.9200,
        lng: 4.4700,
        updatedAt: new Date().toISOString(),
      },
    },
    {
      name: 'Mohammed Khan',
      phone: '+555555555',
      skills: ['plumbing', 'drainage'],
      status: TechnicianStatus.ACTIVE,
      availability: TechnicianAvailability.ONLINE,
      currentLocation: {
        lat: 51.9260,
        lng: 4.4855,
        updatedAt: new Date().toISOString(),
      },
    },
  ])

  console.log('🌱 Technicians seeded')
}