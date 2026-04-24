import { ServiceRequestModel } from './serviceRequest.model'
import { ServiceRequestStatus, ServiceRequestStatusValues } from './serviceRequest.enums'
import { parseDate } from '../../shared/utils/dateConverter'

export class ServiceRequestRepository {

  async create(data) {
    const count = await ServiceRequestModel.countDocuments()

    const doc = new ServiceRequestModel({
      ...data,
      technicianId: null,
      status: ServiceRequestStatus.PENDING,

    })

    doc.referenceNumber = `SR-${Date.now()}-${doc._id.toString().slice(-4)}`

    await doc.save()
  }

  async findAll(query: any) {
    const {
      page = 1,
      limit = 10,
      status,
      area,
      priority,
      technicianId,
      startDate,
      endDate,
      assignmentState,
      q,
      sort = 'createdAt',
      order = 'desc',
    } = query

    const filter: any = {}

    // FILTERS
    if (status) filter.status = status
    if (area) filter.area = area
    if (priority) filter.priority = priority
    if (technicianId) filter.technicianId = technicianId

    if (assignmentState === 'assigned') {
      filter.technicianId = { $ne: null }
    }

    if (assignmentState === 'unassigned') {
      filter.technicianId = null
    }


    // DATE RANGE
    const start = parseDate(startDate)
    const end = parseDate(endDate)

    if (start || end) {
      filter.createdAt = {}

      if (start) filter.createdAt.$gte = start

      if (end) {
        end.setHours(23, 59, 59, 999) 
        filter.createdAt.$lte = end
      }
    }

    // SEARCH 
    if (q) {
      filter.$or = [
        { referenceNumber: { $regex: q, $options: 'i' } },
        { customerName: { $regex: q, $options: 'i' } },
        { customerPhone: { $regex: q, $options: 'i' } },
      ]
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [data, total] = await Promise.all([
      ServiceRequestModel.find(filter)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('technicianId', 'name phone'),
      ServiceRequestModel.countDocuments(filter),
    ])

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    }
  }

  async findById(id: string) {
    return ServiceRequestModel.findById(id).populate({
      path: 'technicianId',
      select: 'name phone',
    })
  }

  async update(id: string, data: any) {
    const allowed = {
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      area: data.area,
      fullAddress: data.fullAddress,
      category: data.category,
      location: data.location,
      priority: data.priority,
    }

    return ServiceRequestModel.findByIdAndUpdate(
      id,
      { $set: allowed },
      { new: true }
    )
  }

  async delete(id: string) {
    return ServiceRequestModel.findByIdAndDelete(id)
  }

  async assign(serviceId: string, technicianId: string) {
    const service = await ServiceRequestModel.findById(serviceId)

    if (!service) {
      throw new Error('Service request not found')
    }

    service.technicianId = technicianId
    service.status = ServiceRequestStatus.ASSIGNED
    await service.save()

    return null
  }

  async unassign(serviceId: String) {
    const service = await ServiceRequestModel.findById(serviceId)

    if (!service) {
      throw new Error('Service request not found')
    }

    service.technicianId = null
    service.status = ServiceRequestStatus.PENDING

    await service.save()

    return null
  }

  async updateStatus(service: any, status: string) {
    service.status = status
    await service.save()

    return null
  }
}