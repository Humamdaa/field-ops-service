import { Request, Response } from 'express'
import { TechnicianRepository } from './technician.repository'
import { success } from '../../shared/utils/response'
import { requireStringParam } from '../../shared/utils/params'

const repo = new TechnicianRepository()

export class TechnicianController {

  create = async (req: Request, res: Response) => {
    await repo.create(req.body)
    res.status(204).send()


  }

  getAll = async (req: Request, res: Response) => {
    const data = await repo.findAll(req.query)
    success(res, data)
  }

  getById = async (req: Request, res: Response) => {
    const data = await repo.findById(requireStringParam(req.params.id, 'id'))
    success(res, data)
  }

  update = async (req: Request, res: Response) => {
    await repo.update(requireStringParam(req.params.id, 'id'), req.body)
    res.status(204).send()


  }

  delete = async (req: Request, res: Response) => {
    await repo.delete(requireStringParam(req.params.id, 'id'))
    res.status(204).send()

  }

  updateStatus = async (req: Request, res: Response) => {
    const { status } = req.body

    const data = await repo.updateStatus(requireStringParam(req.params.id, 'id'), status)
    success(res, data)
  }

  updateLocation = async (req: Request, res: Response) => {
    const { lat, lng } = req.body
    await repo.updateLocation(requireStringParam(req.params.id, 'id'), lat, lng)
    res.status(204).send()

  }
}