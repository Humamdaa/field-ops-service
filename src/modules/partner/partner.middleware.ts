export const apiKeyMiddleware = (req, res, next) => {
  const key = req.headers['x-api-key']
  if (key !== 'SECRET_KEY') {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } })
  }
  next()
}