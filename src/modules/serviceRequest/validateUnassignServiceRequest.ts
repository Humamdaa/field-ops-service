import { Request, Response, NextFunction } from 'express'
import { ServiceRequestStatus } from './serviceRequest.enums'
import { ServiceRequestModel } from './serviceRequest.model'
import mongoose from 'mongoose'

export const validateUnassignServiceRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid service id' },
        })
    }

    const service = await ServiceRequestModel.findById(serviceId)

    if (!service) {
        return res.status(404).json({
            success: false,
            error: { message: 'Service request not found' },
        })
    }

    if (
        service.status === ServiceRequestStatus.COMPLETED ||
        service.status === ServiceRequestStatus.CANCELLED
    ) {
        return res.status(400).json({
            success: false,
            error: { message: 'Cannot unassign completed/cancelled request' },
        })
    }

    if (!service.technicianId) {
        return res.status(400).json({
            success: false,
            error: { message: 'No technician assigned' },
        })
    }


    next()
}