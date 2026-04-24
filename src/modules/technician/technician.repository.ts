import { TechnicianAvailability, TechnicianStatus } from './technician.enums'
import { TechnicianModel } from './technician.model'

export class TechnicianRepository {

  async create(data) {
    const technician = await TechnicianModel.create({
      name: data.name,
      phone: data.phone,
      skills: data.skills || [],
      status: TechnicianStatus.ACTIVE,
      availability: TechnicianAvailability.OFFLINE,
    })

    return technician
  }

  async findAll(filters: any = {}) {
    const query: any = {}

    if (filters.status) {
      query.status = filters.status
    }

    if (filters.availability) {
      query.availability = filters.availability
    }

    return TechnicianModel.find(query)
  }

  async findById(id: string) {
    return TechnicianModel.findById(id)
  }

  async update(id: string, data: any) {
    return TechnicianModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
  }

  async delete(id: string) {
    return TechnicianModel.findByIdAndDelete(id)
  }

  async updateStatus(id: string, status: string) {
    return TechnicianModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
  }

  async updateLocation(id: string, lat: number, lng: number) {
    return TechnicianModel.findByIdAndUpdate(
      id,
      {
        currentLocation: {
          lat,
          lng,
          updatedAt: new Date().toISOString(),
        },
      },
      { new: true }
    )
  }
}