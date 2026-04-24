import express from 'express'
import { apiKeyMiddleware } from './partner.middleware'
import { ServiceRequestService } from '../serviceRequest/serviceRequest.service'
import { success } from '../../shared/utils/response'

const router = express.Router()
const service = new ServiceRequestService()

router.use(apiKeyMiddleware)

router.post('/service-requests', (req, res) => {
  success(res, service.create(req.body, 'partner'))
})

export default router