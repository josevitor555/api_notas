import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'

export default class AuthController {
  /**
   * Handle user login
   */
  async login({ auth, request, response }: HttpContext) {
    // Validate request data
    const payload = await request.validateUsing(loginValidator)
    
    const { email, senha } = payload

    try {
      // Attempt to authenticate the user
      const user = await User.verifyCredentials(email, senha)
      
      // Login the user
      await auth.use('web').login(user)
      
      // Return user data
      return response.ok({
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      return response.badRequest({
        message: 'Invalid credentials',
        error: error.message
      })
    }
  }

  /**
   * Handle user logout
   */
  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.ok({ message: 'Logged out successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error logging out',
        error: error.message
      })
    }
  }
}