import express from 'express'
import { TechnicianController } from './technician.controller'
import { createTechnicianSchema, updateLocationSchema, updateStatusSchema, updateTechnicianSchema } from './technician.validator'
import { validate } from '../../shared/middleware/validate'
import { validateTechnicianExists } from './validateTechnicianExists.middleware'
import { TechnicianRepository } from './technician.repository'

const router = express.Router()
const repo = new TechnicianRepository()
const c = new TechnicianController(repo)

/**
 * @openapi
 * /api/technicians:
 *   get:
 *     summary: Get all technicians
 *     tags:
 *       - Technicians
 *     responses:
 *       200:
 *         description: List of technicians
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "uuid"
 *                   name: "John"
 *                   phone: "+123456"
 *                   skills: ["electric"]
 *                   status: "active"
 *                   availability: "offline"
 *                   currentLocation:
 *                     lat: 30.1
 *                     lng: 31.2
 *                     updatedAt: "2026-01-01T10:00:00Z"
 */
router.get('/', c.getAll)

/**
 * @openapi
 * /api/technicians/{id}:
 *   get:
 *     summary: Get technician by ID
 *     tags:
 *       - Technicians
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Technician ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Technician details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "uuid"
 *                 name: "John Doe"
 *                 phone: "+123456789"
 *                 skills: ["electric"]
 *                 status: "active"
 *                 availability: "online"
 *                 currentLocation:
 *                   lat: 30.123
 *                   lng: 31.456
 *                   updatedAt: "2026-01-01T10:00:00Z"
 *       404:
 *         description: Technician not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Technician not found"
 */
router.get('/:id',
    validateTechnicianExists,
    c.getById)

/**
 * @openapi
 * /api/technicians:
 *   post:
 *     summary: Create technician
 *     tags:
 *       - Technicians
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "John Doe"
 *             phone: "+123456789"
 *             skills: ["electric", "plumbing"]
 *     responses:
 *       204:
 *         description: Technician created successfully (no content)
 */
router.post('/', validate(createTechnicianSchema), c.create)

/**
 * @openapi
 * /api/technicians/{id}:
 *   patch:
 *     summary: Update technician
 *     tags:
 *       - Technicians
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
 *             name: "Updated Name"
 *             phone: "+987654321"
 *             skills: ["hvac"]
 *     responses:
 *       204:
 *         description: Updated successfully (no content)
 */
router.patch('/:id',
    validateTechnicianExists,
    validate(updateTechnicianSchema), c.update)

/**
 * @openapi
 * /api/technicians/{id}:
 *   delete:
 *     summary: Delete technician
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Technicians
 *     responses:
 *       204:
 *         description: Deleted successfully (no content)
 */
router.delete('/:id', validateTechnicianExists, c.delete)

/**
 * @openapi
 * /api/technicians/{id}/deactivate:
 *   patch:
 *     summary: Deactivate technician
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Technicians
 *     responses:
 *       200:
 *         description: Technician deactivated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 status: "inactive"
 *                 availability: "offline"
 */
router.patch(
    '/:id/status',
    validateTechnicianExists,
    validate(updateStatusSchema),
    c.updateStatus
)

/**
 * @openapi
 * /api/technicians/{id}/location:
 *   patch:
 *     summary: Update technician location
 *     tags:
 *       - Technicians
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
 *             lat: 30.123
 *             lng: 31.456
 *     responses:
 *       204:
 *         description: Location updated (no content)
 */
router.patch('/:id/location', validateTechnicianExists, validate(updateLocationSchema), c.updateLocation)


export default router