export const success = (res, data, meta = {}) => {
  res.json({ success: true, data, meta })
}
