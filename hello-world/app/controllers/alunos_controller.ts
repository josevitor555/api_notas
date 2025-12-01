import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AlunosController {
  /**
   * List all students
   */
  async index({ response }: HttpContext) {
    try {
      const alunos = await User.query().where('role', 'aluno')
      return response.ok(alunos)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching students',
        error: error.message
      })
    }
  }

  /**
   * Show a specific student
   */
  async show({ params, response }: HttpContext) {
    try {
      const aluno = await User.findOrFail(params.id)
      if (aluno.role !== 'aluno') {
        return response.badRequest({ message: 'User is not a student' })
      }
      return response.ok(aluno)
    } catch (error) {
      return response.notFound({
        message: 'Student not found',
        error: error.message
      })
    }
  }

  /**
   * Create a new student (admin only)
   */
  async store({ request, response }: HttpContext) {
    try {
      const { nome, email, senha } = request.only(['nome', 'email', 'senha'])
      
      // Check if email already exists
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.badRequest({ message: 'Email already exists' })
      }

      // Create student with aluno role
      const aluno = await User.create({
        nome,
        email,
        senha: await hash.make(senha),
        role: 'aluno'
      })

      return response.created(aluno)
    } catch (error) {
      return response.badRequest({
        message: 'Error creating student',
        error: error.message
      })
    }
  }

  /**
   * Update a student
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const aluno = await User.findOrFail(params.id)
      if (aluno.role !== 'aluno') {
        return response.badRequest({ message: 'User is not a student' })
      }

      const { nome, email } = request.only(['nome', 'email'])
      
      // Check if email already exists (and it's not this user's email)
      if (email && email !== aluno.email) {
        const existingUser = await User.findBy('email', email)
        if (existingUser) {
          return response.badRequest({ message: 'Email already exists' })
        }
      }

      aluno.merge({ nome, email })
      await aluno.save()

      return response.ok(aluno)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating student',
        error: error.message
      })
    }
  }

  /**
   * Delete a student
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const aluno = await User.findOrFail(params.id)
      if (aluno.role !== 'aluno') {
        return response.badRequest({ message: 'User is not a student' })
      }

      await aluno.delete()
      return response.ok({ message: 'Student deleted successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error deleting student',
        error: error.message
      })
    }
  }
}