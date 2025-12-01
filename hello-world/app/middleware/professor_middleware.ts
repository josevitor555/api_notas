import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ProfessorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Check if user is authenticated
    if (!ctx.auth.user) {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    // Check if user has professor role
    if (ctx.auth.user.role !== 'professor') {
      return ctx.response.forbidden({ message: 'Access denied. Professor role required.' })
    }

    return next()
  }
}