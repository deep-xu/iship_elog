import * as authService from '../services/auth.service.js'

export async function login(req, res) {
  const { userId, password } = req.body ?? {}
  res.json(await authService.authenticate(userId, password))
}
