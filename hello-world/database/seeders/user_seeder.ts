import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  async run() {
    // Create admin user
    await User.updateOrCreate(
      { email: 'admin@example.com' },
      {
        nome: 'Admin User',
        email: 'admin@example.com',
        senha: await hash.make('password123'),
        role: 'admin'
      }
    )

    // Create professor user
    await User.updateOrCreate(
      { email: 'professor@example.com' },
      {
        nome: 'Professor User',
        email: 'professor@example.com',
        senha: await hash.make('password123'),
        role: 'professor'
      }
    )

    // Create aluno (student) user
    await User.updateOrCreate(
      { email: 'aluno@example.com' },
      {
        nome: 'Aluno User',
        email: 'aluno@example.com',
        senha: await hash.make('password123'),
        role: 'aluno'
      }
    )
  }
}