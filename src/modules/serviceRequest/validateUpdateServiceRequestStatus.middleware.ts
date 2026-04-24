import { Request, Response, NextFunction } from 'express'
import { ServiceRequestStatus } from './serviceRequest.enums'

export const validateUpdateServiceRequestStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const service = req.serviceRequest
    const newStatus = req.body.status

    if (!newStatus) {
        return res.status(400).json({
            success: false,
            error: { message: 'status is required' },
        })
    }

    if (
        service.status === ServiceRequestStatus.COMPLETED ||
        service.status === ServiceRequestStatus.CANCELLED
    ) {
        return res.status(400).json({
            success: false,
            error: { message: 'Cannot change status of finished request' },
        })
    }


    next()
}