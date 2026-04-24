import { Request, Response, NextFunction } from 'express'
import { TechnicianModel } from './technician.model'
import mongoose from 'mongoose'

export const validateTechnicianExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    console.log('id is: ', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid technician id' },
        })
    }

    const tech = await TechnicianModel.findById(id)
    if (!tech) {
        console.log('Technician not found')
        return res.status(404).json({
            success: false,
            error: { message: 'Technician not found' },
        })
    }

    ; (req as any).technician = tech

    next()
}