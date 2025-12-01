import type { HttpContext } from '@adonisjs/core/http'
import Nota from '#models/nota'

export default class NotasController {
  /**
   * List all grades
   */
  async index({ response }: HttpContext) {
    try {
      const notas = await Nota.all()
      return response.ok(notas)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching grades',
        error: error.message
      })
    }
  }

  /**
   * Show a specific grade
   */
  async show({ params, response }: HttpContext) {
    try {
      const nota = await Nota.findOrFail(params.id)
      return response.ok(nota)
    } catch (error) {
      return response.notFound({
        message: 'Grade not found',
        error: error.message
      })
    }
  }

  /**
   * Create a new grade (professor only)
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      // Check if user is a professor
      if (!auth.user || auth.user.role !== 'professor') {
        return response.forbidden({ message: 'Only professors can create grades' })
      }

      const { alunoId, materiaId, nota1, nota2 } = request.only(['alunoId', 'materiaId', 'nota1', 'nota2'])
      
      // Calculate average and determine status
      const media = nota1 && nota2 ? (nota1 + nota2) / 2 : null
      let situacao: 'aprovado' | 'recuperacao' | 'reprovado' | null = null
      
      if (media !== null) {
        if (media >= 7) {
          situacao = 'aprovado'
        } else if (media >= 5) {
          situacao = 'recuperacao'
        } else {
          situacao = 'reprovado'
        }
      }

      const nota = await Nota.create({
        alunoId,
        materiaId,
        nota1,
        nota2,
        media,
        situacao
      })

      return response.created(nota)
    } catch (error) {
      return response.badRequest({
        message: 'Error creating grade',
        error: error.message
      })
    }
  }

  /**
   * Update a grade (professor only)
   */
  async update({ params, request, response, auth }: HttpContext) {
    try {
      // Check if user is a professor
      if (!auth.user || auth.user.role !== 'professor') {
        return response.forbidden({ message: 'Only professors can update grades' })
      }

      const nota = await Nota.findOrFail(params.id)
      const { nota1, nota2 } = request.only(['nota1', 'nota2'])

      // Update values
      if (nota1 !== undefined) nota.nota1 = nota1
      if (nota2 !== undefined) nota.nota2 = nota2

      // Recalculate average and determine status
      if (nota.nota1 !== null && nota.nota2 !== null) {
        nota.media = (nota.nota1 + nota.nota2) / 2
        
        if (nota.media >= 7) {
          nota.situacao = 'aprovado'
        } else if (nota.media >= 5) {
          nota.situacao = 'recuperacao'
        } else {
          nota.situacao = 'reprovado'
        }
      } else {
        nota.media = null
        nota.situacao = null
      }

      await nota.save()

      return response.ok(nota)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating grade',
        error: error.message
      })
    }
  }

  /**
   * Delete a grade (professor only)
   */
  async destroy({ params, response, auth }: HttpContext) {
    try {
      // Check if user is a professor
      if (!auth.user || auth.user.role !== 'professor') {
        return response.forbidden({ message: 'Only professors can delete grades' })
      }

      const nota = await Nota.findOrFail(params.id)
      await nota.delete()
      return response.ok({ message: 'Grade deleted successfully' })
    } catch (error) {
      return response.badRequest({
        message: 'Error deleting grade',
        error: error.message
      })
    }
  }
}