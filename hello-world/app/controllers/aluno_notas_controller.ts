import type { HttpContext } from '@adonisjs/core/http'
import Nota from '#models/nota'
import Aluno from '#models/aluno'

export default class AlunoNotasController {
  /**
   * Get grades for the authenticated student
   */
  async index({ response, auth }: HttpContext) {
    try {
      // Check if user is a student
      if (!auth.user || auth.user.role !== 'aluno') {
        return response.forbidden({ message: 'Only students can view their grades' })
      }

      // Find the aluno record for this user
      // Since we don't have a direct relationship, we'll find the aluno by user_id
      const alunos = await Aluno.query().where('user_id', auth.user.id)
      if (!alunos.length) {
        return response.notFound({ message: 'Student record not found' })
      }
      
      const aluno = alunos[0]

      // Get grades for this student
      const notas = await Nota.query().where('aluno_id', aluno.id)
      
      return response.ok(notas)
    } catch (error) {
      return response.badRequest({
        message: 'Error fetching grades',
        error: error.message
      })
    }
  }
}