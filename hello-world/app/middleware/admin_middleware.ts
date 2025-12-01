import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Check if user is authenticated
    if (!ctx.auth.user) {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    // Check if user has admin role
    if (ctx.auth.user.role !== 'admin') {
      return ctx.response.forbidden({ message: 'Access denied. Admin role required.' })
    }

    return next()
  }
}