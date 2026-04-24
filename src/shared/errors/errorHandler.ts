import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { ZodError } from 'zod'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: err.issues[0]?.message || 'Validation error',
        statusCode: 400,
      },
    })
  }

  // Known app error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    })
  }

  // Unknown error
  console.error(err)

  return res.status(500).json({
    success: false,
    error: {
      message: 'Internal Server Error..',
      statusCode: 500,
    },
  })
}