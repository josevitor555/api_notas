/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const AlunosController = () => import('#controllers/alunos_controller')
const ProfessoresController = () => import('#controllers/professores_controller')
const TurmasController = () => import('#controllers/turmas_controller')
const MateriasController = () => import('#controllers/materias_controller')
const NotasController = () => import('#controllers/notas_controller')
const AlunoNotasController = () => import('#controllers/aluno_notas_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Authentication routes
router.post('/api/v1/auth/login', [AuthController, 'login'])
router.post('/api/v1/auth/logout', [AuthController, 'logout']).use(middleware.auth())

// Student routes (admin only)
router.get('/api/v1/alunos', [AlunosController, 'index']).use(middleware.auth()).use(middleware.admin())
router.get('/api/v1/alunos/:id', [AlunosController, 'show']).use(middleware.auth()).use(middleware.admin())
router.post('/api/v1/alunos', [AlunosController, 'store']).use(middleware.auth()).use(middleware.admin())
router.put('/api/v1/alunos/:id', [AlunosController, 'update']).use(middleware.auth()).use(middleware.admin())
router.delete('/api/v1/alunos/:id', [AlunosController, 'destroy']).use(middleware.auth()).use(middleware.admin())

// Professor routes (admin only)
router.get('/api/v1/professores', [ProfessoresController, 'index']).use(middleware.auth()).use(middleware.admin())
router.get('/api/v1/professores/:id', [ProfessoresController, 'show']).use(middleware.auth()).use(middleware.admin())
router.post('/api/v1/professores', [ProfessoresController, 'store']).use(middleware.auth()).use(middleware.admin())
router.put('/api/v1/professores/:id', [ProfessoresController, 'update']).use(middleware.auth()).use(middleware.admin())
router.delete('/api/v1/professores/:id', [ProfessoresController, 'destroy']).use(middleware.auth()).use(middleware.admin())

// Class routes (admin only)
router.get('/api/v1/turmas', [TurmasController, 'index']).use(middleware.auth()).use(middleware.admin())
router.get('/api/v1/turmas/:id', [TurmasController, 'show']).use(middleware.auth()).use(middleware.admin())
router.post('/api/v1/turmas', [TurmasController, 'store']).use(middleware.auth()).use(middleware.admin())
router.put('/api/v1/turmas/:id', [TurmasController, 'update']).use(middleware.auth()).use(middleware.admin())
router.delete('/api/v1/turmas/:id', [TurmasController, 'destroy']).use(middleware.auth()).use(middleware.admin())

// Subject routes (admin only)
router.get('/api/v1/materias', [MateriasController, 'index']).use(middleware.auth()).use(middleware.admin())
router.get('/api/v1/materias/:id', [MateriasController, 'show']).use(middleware.auth()).use(middleware.admin())
router.post('/api/v1/materias', [MateriasController, 'store']).use(middleware.auth()).use(middleware.admin())
router.put('/api/v1/materias/:id', [MateriasController, 'update']).use(middleware.auth()).use(middleware.admin())
router.delete('/api/v1/materias/:id', [MateriasController, 'destroy']).use(middleware.auth()).use(middleware.admin())

// Grade routes (professor only for create/update/delete)
router.get('/api/v1/notas', [NotasController, 'index']).use(middleware.auth())
router.get('/api/v1/notas/:id', [NotasController, 'show']).use(middleware.auth())
router.post('/api/v1/notas', [NotasController, 'store']).use(middleware.auth())
router.put('/api/v1/notas/:id', [NotasController, 'update']).use(middleware.auth())
router.delete('/api/v1/notas/:id', [NotasController, 'destroy']).use(middleware.auth())

// Student grade view routes (student only)
router.get('/api/v1/aluno/notas', [AlunoNotasController, 'index']).use(middleware.auth()).use(middleware.student())

// Test routes for role-based access control
router.get('/api/v1/admin/test', async () => {
  return { message: 'Admin only route' }
}).use(middleware.auth()).use(middleware.admin())

router.get('/api/v1/professor/test', async () => {
  return { message: 'Professor only route' }
}).use(middleware.auth()).use(middleware.professor())

router.get('/api/v1/aluno/test', async () => {
  return { message: 'Aluno only route' }
}).use(middleware.auth()).use(middleware.student())

// Protected route that requires any authentication
router.get('/api/v1/protected', async ({ auth }) => {
  return { 
    message: 'Protected route',
    user: auth.user 
  }
}).use(middleware.auth())