import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny, ZodError } from 'zod'

export const validate =
    (schema: ZodTypeAny) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body)
                next()
            } catch (err) {
                const error = err as ZodError

                res.status(400).json({
                    success: false,
                    error: {
                        message: error.issues?.[0]?.message || 'Validation error',
                        statusCode: 400,
                    },
                })
            }
        }