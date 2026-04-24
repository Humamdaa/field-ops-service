import { Request, Response, NextFunction } from 'express'
import {
    ServiceRequestStatusValues,
    ServiceRequestPriorityValues,
} from './serviceRequest.enums'
import { parseDate } from '../../shared/utils/dateConverter'

const allowedSortFields = ['createdAt', 'updatedAt', 'priority', 'status']
const allowedOrder = ['asc', 'desc']

export const validateServiceRequestQuery = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const q = req.query

    // PAGE & LIMIT
    const page = Math.max(1, Number(q.page) || 1)
    const limit = Math.max(1, Number(q.limit) || 10)

    // STATUS
    if (q.status && !ServiceRequestStatusValues.includes(q.status as any)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid status value' },
        })
    }

    // PRIORITY
    if (q.priority && !ServiceRequestPriorityValues.includes(q.priority as any)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid priority value' },
        })
    }

    // SORT
    if (q.sort && !allowedSortFields.includes(q.sort as any)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid sort field' },
        })
    }

    // ORDER
    if (q.order && !allowedOrder.includes(q.order as any)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid order value' },
        })
    }

    // assignmentState
    if (
        q.assignmentState &&
        !['assigned', 'unassigned'].includes(q.assignmentState as any)
    ) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid assignmentState value' },
        })
    }

    // DATE VALIDATION
    const start = parseDate(q.startDate as string)
    const end = parseDate(q.endDate as string)
    const now = new Date()

    if (q.startDate && !start) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid startDate format (DD/MM/YYYY)' },
        })
    }

    if (q.endDate && !end) {
        return res.status(400).json({
            success: false,
            error: { message: 'Invalid endDate format (DD/MM/YYYY)' },
        })
    }

    if (start && start > now) {
        return res.status(400).json({
            success: false,
            error: { message: 'startDate cannot be in the future' },
        })
    }

    if (end && end > now) {
        return res.status(400).json({
            success: false,
            error: { message: 'endDate cannot be in the future' },
        })
    }

    if (start && end && start > end) {
        return res.status(400).json({
            success: false,
            error: { message: 'startDate cannot be greater than endDate' },
        })
    }

    ; (req as any).queryParsed = {
        page,
        limit,
        status: q.status,
        priority: q.priority,
        area: q.area,
        technicianId: q.technicianId,
        assignmentState: q.assignmentState,
        startDate: q.startDate,
        endDate: q.endDate,
        q: q.q,
        sort: q.sort || 'createdAt',
        order: q.order || 'desc',
    }

    next()
}