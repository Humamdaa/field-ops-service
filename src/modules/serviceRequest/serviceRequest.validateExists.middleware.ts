import { Request, Response, NextFunction } from 'express'
import { ServiceRequestModel } from './serviceRequest.model'
import mongoose from 'mongoose'

export const validateServiceRequestExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid service request id' },
        })
    }

    const service = await ServiceRequestModel.findById(id)

    if (!service) {
        return res.status(404).json({
            success: false,
            error: { message: 'Service request not found' },
        })
    }

    ; (req as any).serviceRequest = service

    next()
}