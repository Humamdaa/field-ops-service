import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { TechnicianModel } from '../technician/technician.model'
import { TechnicianStatus } from '../technician/technician.enums'
import { ServiceRequestModel } from './serviceRequest.model'
import { ServiceRequestStatus } from './serviceRequest.enums'

export const validateAssignServiceRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { technicianId } = req.body

  if (!technicianId) {
    return res.status(400).json({
      success: false,
      error: { message: 'technicianId is required' },
    })
  }

  if (!mongoose.Types.ObjectId.isValid(technicianId)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid technician id' },
    })
  }

  const tech = await TechnicianModel.findById(technicianId)
  if (!tech) {
    return res.status(404).json({
      success: false,
      error: { message: 'Technician not found' },
    })
  }

  if (tech.status !== TechnicianStatus.ACTIVE) {
    return res.status(400).json({
      success: false,
      error: { message: 'Technician is not active' },
    })
  }

  const serviceId = req.params.id

  // check if technician have service assigned 
  const activeService = await ServiceRequestModel.findOne({
    technicianId,
    status: {
      $nin: [
        ServiceRequestStatus.COMPLETED,
        ServiceRequestStatus.CANCELLED,
      ],
    },
    _id: { $ne: serviceId },
  })

  if (activeService) {
    return res.status(400).json({
      success: false,
      error: { message: 'Technician already has active service' },
    })
  }


  next()
}