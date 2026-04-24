import { Request, Response } from 'express'
import { TechnicianRepository } from './technician.repository'
import { success } from '../../shared/utils/response'
import { requireStringParam } from '../../shared/utils/params'



export class TechnicianController {
  constructor(private repo: TechnicianRepository) { }

  create = async (req: Request, res: Response) => {
    await this.repo.create(req.body)
    res.status(204).send()


  }

  getAll = async (req: Request, res: Response) => {
    const data = await this.repo.findAll(req.query)
    success(res, data)
  }

  getById = async (req: Request, res: Response) => {
    const data = await this.repo.findById(requireStringParam(req.params.id, 'id'))
    success(res, data)
  }

  update = async (req: Request, res: Response) => {
    await this.repo.update(requireStringParam(req.params.id, 'id'), req.body)
    res.status(204).send()


  }

  delete = async (req: Request, res: Response) => {
    await this.repo.delete(requireStringParam(req.params.id, 'id'))
    res.status(204).send()

  }

  updateStatus = async (req: Request, res: Response) => {
    const { status } = req.body

    const data = await this.repo.updateStatus(requireStringParam(req.params.id, 'id'), status)
    success(res, data)
  }

  updateLocation = async (req: Request, res: Response) => {
    const io = req.app.get('io')

    const technicianId = req.params.id
    const { lat, lng } = req.body

    const updated = await this.repo.updateLocation(requireStringParam(technicianId, 'id'), lat, lng)

    io.emit('technician:location:update', {
      technicianId,
      location: updated,
    })

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      data: updated,
    })
  }
}