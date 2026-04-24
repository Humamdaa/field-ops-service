import express from 'express'
import { ServiceRequestController } from './serviceRequest.controller'
import { createServiceRequestSchema, updateServiceRequestSchema, updateServiceRequestStatus } from './serviceRequest.validator'
import { validate } from '../../shared/middleware/validate'
import { validateServiceRequestExists } from './serviceRequest.validateExists.middleware'
import { validateAssignServiceRequest } from './validateAssignServiceRequest'
import { validateUnassignServiceRequest } from './validateUnassignServiceRequest'
import { validateUpdateServiceRequestStatus } from './validateUpdateServiceRequestStatus.middleware'
import { validateServiceRequestQuery } from './serviceRequest.query.validator'

const router = express.Router()
const c = new ServiceRequestController()

/**
 * @openapi
 * /api/service-requests:
 *   get:
 *     summary: Get all service requests (with filtering, search, sorting, pagination)
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: "pending"
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         example: "Downtown"
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         example: "high"
 *       - in: query
 *         name: technicianId
 *         schema:
 *           type: string
 *       - in: query
 *         name: assignmentState
 *         schema:
 *           type: string
 *           enum: [assigned, unassigned]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         example: "10/05/2026"
 *         description: "Format: DD/MM/YYYY"
 *       
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         example: "31/05/2026"
 *         description: "Format: DD/MM/YYYY"
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         example: "Ahmed"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, priority, status]
 *         example: "createdAt"
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: "desc"
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: List of service requests
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "64f..."
 *                   referenceNumber: "SR-000001"
 *                   customerName: "Ahmed Ali"
 *                   status: "pending"
 *                   priority: "high"
 *               meta:
 *                 total: 50
 *                 page: 1
 *                 limit: 10
 *                 pages: 5
 */
router.get('/', validateServiceRequestQuery, c.getAll)

/**
 * @openapi
 * /api/service-requests/{id}:
 *   get:
 *     summary: Get service request by id
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service request details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "64f..."
 *                 referenceNumber: "SR-A1B2C3"
 *                 customerName: "Ahmed Ali"
 *                 technician:
 *                   name: "John Doe"
 *                   phone: "+111111"
 */
router.get('/:id', validateServiceRequestExists, c.getById)

/**
 * @openapi
 * /api/service-requests:
 *   post:
 *     summary: Create service request
 *     tags:
 *       - Service Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerName: "Ahmed Ali"
 *             customerPhone: "+123456"
 *             category: "plumbing"
 *             priority: "high"
 *             location:
 *               lat: 30.1
 *               lng: 31.2
 *             technicianId: "64f..."
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 referenceNumber: "SR-A1B2C3"
 *                 status: "assigned"
 */
router.post(
    '/',
    validate(createServiceRequestSchema),
    c.create
)

/**
 * @openapi
 * /api/service-requests/{id}:
 *   delete:
 *     summary: Delete service request
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete('/:id', validateServiceRequestExists, c.delete)

/**
 * @openapi
 * /api/service-requests/{id}:
 *   patch:
 *     summary: Update service request
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "in_progress"
 *             technicianId: "64f..."
 *             priority: "high"
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 status: "in_progress"
 */
router.patch(
    '/:id', validateServiceRequestExists,
    validate(updateServiceRequestSchema),
    c.update
)

/**
 * @openapi
 * /api/service-requests/{id}/assign:
 *   patch:
 *     summary: Assign service request to a technician
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             technicianId: "64f1c2a9b8c9d123456789ab"
 *     responses:
 *       200:
 *         description: Service request assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "64f1c2a9b8c9d123456789aa"
 *                 status: "assigned"
 *                 technicianId: "64f1c2a9b8c9d123456789ab"
 *       400:
 *         description: Invalid request or business rule violation
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Technician is not active"
 *       404:
 *         description: Service request not found
 */
router.patch(
    '/:id/assign',
    validateServiceRequestExists,
    validateAssignServiceRequest,
    c.assign
)

/**
 * @openapi
 * /api/service-requests/{id}/unassign:
 *   patch:
 *     summary: Unassign technician from service request
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service request ID
 *     responses:
 *       200:
 *         description: Service request unassigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "64f1c2a9b8c9d123456789aa"
 *                 status: "pending"
 *                 technicianId: null
 *       400:
 *         description: Cannot unassign request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Cannot unassign completed/cancelled request"
 *       404:
 *         description: Service request not found
 */
router.patch(
    '/:id/unassign',
    validateServiceRequestExists,
    validateUnassignServiceRequest,
    c.unassign
)

/**
 * @openapi
 * /api/service-requests/{id}/status:
 *   patch:
 *     summary: Update service request status
 *     tags:
 *       - Service Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "in_progress"
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 status: "in_progress"
 */
router.patch(
    '/:id/status',
    validateServiceRequestExists,
    validate(updateServiceRequestStatus),
    validateUpdateServiceRequestStatus,
    c.updateStatus
)

export default router