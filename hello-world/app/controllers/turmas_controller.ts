import type { HttpContext } from '@adonisjs/core/http'
import Turma from '#models/turma'

export default class TurmasController {
  /**
   * List all classes
   */
  async index({ response }: HttpContext) {
    try {
      const turmas = await Turma.all()
      return response.ok(turmas)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching classes',
        error: error.message
      })
    }
  }

  /**
   * Show a specific class
   */
  async show({ params, response }: HttpContext) {
    try {
      const turma = await Turma.findOrFail(params.id)
      return response.ok(turma)
    } catch (error) {
      return response.notFound({
        message: 'Class not found',
        error: error.message
      })
    }
  }

  /**
   * Create a new class (admin only)
   */
  async store({ request, response }: HttpContext) {
    try {
      const { nome, anoLetivo } = request.only(['nome', 'anoLetivo'])
      
      const turma = await Turma.create({
        nome,
        anoLetivo
      })

      return response.created(turma)
    } catch (error) {
      return response.badRequest({
        message: 'Error creating class',
        error: error.message
      })
    }
  }

  /**
   * Update a class
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const turma = await Turma.findOrFail(params.id)
      const { nome, anoLetivo } = request.only(['nome', 'anoLetivo'])

      turma.merge({ nome, anoLetivo })
      await turma.save()

      return response.ok(turma)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating class',
        error: error.message
      })
    }
  }

  /**
   * Delete a class
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const turma = await Turma.findOrFail(params.id)
      await turma.delete()
      return response.ok({ message: 'Class deleted successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error deleting class',
        error: error.message
      })
    }
  }
}