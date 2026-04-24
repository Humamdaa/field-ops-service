import { Request, Response } from 'express'
import { ServiceRequestRepository } from './serviceRequest.repository'
import { success } from '../../shared/utils/response'
import { requireStringParam } from '../../shared/utils/params'

const repo = new ServiceRequestRepository()

export class ServiceRequestController {

  create = async (req: Request, res: Response) => {
    await repo.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
    })
  }


  getAll = async (req: Request, res: Response) => {
    const result = await repo.findAll(req.query)
    
    res.json({
      success: true,
      data: result.data,
      meta: result.meta,
    })
  }

  getById = async (req: Request, res: Response) => {
    const data = await repo.findById(requireStringParam(req.params.id, 'id'))
    success(res, data)
  }

  update = async (req: Request, res: Response) => {
    await repo.update(requireStringParam(req.params.id, 'id'), req.body)
    res.status(200).json({
      success: true,
      message: 'Service updatede successfully',
    })
  }

  delete = async (req: Request, res: Response) => {
    await repo.delete(requireStringParam(req.params.id, 'id'))
    res.status(201).json({
      success: true,
      message: 'Service deleted successfully',
    })
  }

  assign = async (req: Request, res: Response) => {
    const serviceId = req.params.id
    const technicianId = req.body.technicianId

    await repo.assign(serviceId, technicianId)

    res.status(200).json({
      success: true,
      message: 'Service assigned successfully',
    })
  }

  unassign = async (req: Request, res: Response) => {
    await repo.unassign(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Service unassigned successfully',
    })
  }

  updateStatus = async (req: Request, res: Response) => {
    await repo.updateStatus(req.serviceRequest, req.body.status)

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    })
  }
}