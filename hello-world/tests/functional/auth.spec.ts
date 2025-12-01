import { test } from '@japa/runner'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

test.group('Auth', (group) => {
  group.setup(async () => {
    // Create test users
    await User.updateOrCreate(
      { email: 'test@example.com' },
      {
        nome: 'Test User',
        email: 'test@example.com',
        senha: await hash.make('password123'),
        role: 'admin'
      }
    )
  })

  test('can login with valid credentials', async ({ client, assert }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .json({
        email: 'test@example.com',
        senha: 'password123'
      })

    response.assertStatus(200)
    assert.exists(response.body().user)
    assert.equal(response.body().user.email, 'test@example.com')
  })

  test('cannot login with invalid credentials', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .json({
        email: 'test@example.com',
        senha: 'wrongpassword'
      })

    response.assertStatus(400)
  })
})