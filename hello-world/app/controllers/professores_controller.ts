import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class ProfessoresController {
  /**
   * List all professors
   */
  async index({ response }: HttpContext) {
    try {
      const professores = await User.query().where('role', 'professor')
      return response.ok(professores)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching professors',
        error: error.message
      })
    }
  }

  /**
   * Show a specific professor
   */
  async show({ params, response }: HttpContext) {
    try {
      const professor = await User.findOrFail(params.id)
      if (professor.role !== 'professor') {
        return response.badRequest({ message: 'User is not a professor' })
      }
      return response.ok(professor)
    } catch (error) {
      return response.notFound({
        message: 'Professor not found',
        error: error.message
      })
    }
  }

  /**
   * Create a new professor (admin only)
   */
  async store({ request, response }: HttpContext) {
    try {
      const { nome, email, senha } = request.only(['nome', 'email', 'senha'])
      
      // Check if email already exists
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.badRequest({ message: 'Email already exists' })
      }

      // Create professor with professor role
      const professor = await User.create({
        nome,
        email,
        senha: await hash.make(senha),
        role: 'professor'
      })

      return response.created(professor)
    } catch (error) {
      return response.badRequest({
        message: 'Error creating professor',
        error: error.message
      })
    }
  }

  /**
   * Update a professor
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const professor = await User.findOrFail(params.id)
      if (professor.role !== 'professor') {
        return response.badRequest({ message: 'User is not a professor' })
      }

      const { nome, email } = request.only(['nome', 'email'])
      
      // Check if email already exists (and it's not this user's email)
      if (email && email !== professor.email) {
        const existingUser = await User.findBy('email', email)
        if (existingUser) {
          return response.badRequest({ message: 'Email already exists' })
        }
      }

      professor.merge({ nome, email })
      await professor.save()

      return response.ok(professor)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating professor',
        error: error.message
      })
    }
  }

  /**
   * Delete a professor
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const professor = await User.findOrFail(params.id)
      if (professor.role !== 'professor') {
        return response.badRequest({ message: 'User is not a professor' })
      }

      await professor.delete()
      return response.ok({ message: 'Professor deleted successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error deleting professor',
        error: error.message
      })
    }
  }
}