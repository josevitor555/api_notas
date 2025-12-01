import type { HttpContext } from '@adonisjs/core/http'
import Materia from '#models/materia'

export default class MateriasController {
  /**
   * List all subjects
   */
  async index({ response }: HttpContext) {
    try {
      const materias = await Materia.all()
      return response.ok(materias)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching subjects',
        error: error.message
      })
    }
  }

  /**
   * Show a specific subject
   */
  async show({ params, response }: HttpContext) {
    try {
      const materia = await Materia.findOrFail(params.id)
      return response.ok(materia)
    } catch (error) {
      return response.notFound({
        message: 'Subject not found',
        error: error.message
      })
    }
  }

  /**
   * Create a new subject (admin only)
   */
  async store({ request, response }: HttpContext) {
    try {
      const { nome, turmaId, professorId } = request.only(['nome', 'turmaId', 'professorId'])
      
      const materia = await Materia.create({
        nome,
        turmaId,
        professorId
      })

      return response.created(materia)
    } catch (error) {
      return response.badRequest({
        message: 'Error creating subject',
        error: error.message
      })
    }
  }

  /**
   * Update a subject
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const materia = await Materia.findOrFail(params.id)
      const { nome, turmaId, professorId } = request.only(['nome', 'turmaId', 'professorId'])

      materia.merge({ nome, turmaId, professorId })
      await materia.save()

      return response.ok(materia)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating subject',
        error: error.message
      })
    }
  }

  /**
   * Delete a subject
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const materia = await Materia.findOrFail(params.id)
      await materia.delete()
      return response.ok({ message: 'Subject deleted successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error deleting subject',
        error: error.message
      })
    }
  }
}