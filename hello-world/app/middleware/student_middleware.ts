import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class StudentMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Check if user is authenticated
    if (!ctx.auth.user) {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    // Check if user has aluno (student) role
    if (ctx.auth.user.role !== 'aluno') {
      return ctx.response.forbidden({ message: 'Access denied. Student role required.' })
    }

    return next()
  }
}