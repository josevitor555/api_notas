# Sistema de Gerenciamento de Notas Escolares

## 1. Introdução

### 1.1. Propósito

Este documento tem como objetivo descrever de forma precisa os requisitos funcionais e não funcionais do sistema de Gerenciamento de Notas Escolares, englobando suas funcionalidades principais, regras de negócio, módulos de autenticação e casos de uso. O sistema proposto disponibiliza uma interface de programação de aplicações (API) voltada ao cadastro e gerenciamento de alunos, professores, turmas, matérias e notas, garantindo segurança, consistência e integridade das informações.

### 1.2. Escopo

O sistema consiste em uma API RESTful que permitirá que administradores cadastrem e gerenciem usuários e turmas; professores lancem e atualizem notas; e alunos consultem seus resultados acadêmicos. A API será independente de interface gráfica, mas poderá ser integrada futuramente a aplicações web, mobile ou sistemas escolares.

### 1.3. Definições e Abreviações

- **API** – Application Programming Interface
- **JWT** – JSON Web Token, utilizado para autenticação e autorização
- **CRUD** – Create, Read, Update, Delete
- **MVP** – Minimum Viable Product (Produto Mínimo Viável)

## 2. Descrição Geral

### 2.1. Perspectiva do Produto

O sistema atuará como camada de backend para um ambiente de gestão escolar. Por meio de endpoints RESTful, será possível manipular dados referentes a alunos, professores, turmas, matérias e notas. A API utilizará autenticação baseada em papéis (roles), definindo permissões distintas para administradores, professores e alunos.

### 2.2. Usuários do Sistema

- **Administrador**: responsável pelo gerenciamento global do sistema, incluindo usuários, turmas e matérias.
- **Professor**: responsável pelo lançamento, atualização e consulta de notas em suas matérias.
- **Aluno**: responsável por consultar suas notas, médias e situação acadêmica final.

### 2.3. Restrições

- O sistema deverá operar em ambiente web.
- Um banco de dados relacional (ex.: MySQL ou PostgreSQL) será utilizado.
- A autenticação será obrigatória para todas as rotas, exceto para o endpoint de login.
- Apenas um professor poderá ser responsável por cada matéria.

## 3. Requisitos Funcionais

- **RF01 – Cadastro de Alunos**: O sistema deve permitir que o administrador cadastre novos alunos, informando dados pessoais e vinculando-os a uma turma.

- **RF02 – Edição e Exclusão de Alunos**: O administrador deve poder editar e remover cadastros de alunos.

- **RF03 – Cadastro de Professores**: O sistema deve permitir o cadastro de professores, contendo nome, e-mail e senha de acesso.

- **RF04 – Edição e Exclusão de Professores**: O administrador deve poder editar e remover professores do sistema.

- **RF05 – Cadastro de Turmas**: O sistema deve permitir o cadastro de turmas, associando-as a um ano letivo e, opcionalmente, a um professor coordenador.

- **RF06 – Cadastro de Matérias**: O administrador deve cadastrar matérias e associá-las a uma turma e a um professor responsável.

- **RF07 – Lançamento de Notas**: O professor deve poder lançar notas para os alunos vinculados à turma e à matéria sob sua responsabilidade.

- **RF08 – Atualização de Notas**: O professor deve poder atualizar notas já registradas, respeitando as permissões e vínculos acadêmicos.

- **RF09 – Consulta de Notas e Médias (Aluno)**: O aluno deve poder consultar suas notas, médias e situação final em cada matéria.

- **RF10 – Cálculo Automático de Médias**: O sistema deve calcular automaticamente a média das notas de cada aluno com base nas avaliações registradas.

- **RF11 – Determinação de Situação Final**: O sistema deve atribuir automaticamente a situação final do aluno:
  - Aprovado: média ≥ 7,0
  - Recuperação: 5,0 ≤ média < 7,0
  - Reprovado: média < 5,0

- **RF12 – Autenticação de Usuários**: O sistema deve autenticar administradores, professores e alunos por meio de JWT.

- **RF13 – Controle de Acesso por Perfil**: O sistema deve garantir que cada tipo de usuário acesse apenas as funcionalidades permitidas para seu perfil.

## 4. Requisitos Não Funcionais

- **RNF01 – Desempenho**: As respostas da API devem possuir tempo médio inferior a 1 segundo em condições normais.

- **RNF02 – Segurança**: A autenticação utilizará tokens JWT, e as senhas devem ser armazenadas com criptografia segura.

- **RNF03 – Escalabilidade**: A arquitetura da API deverá permitir integração futura com sistemas web ou mobile sem necessidade de alterações estruturais significativas.

- **RNF04 – Manutenibilidade**: A aplicação deve ser modular, seguindo separação entre controllers, models, services e rotas.

- **RNF05 – Padrões de API**: A API seguirá o estilo REST, utilizando métodos HTTP adequados e respostas em formato JSON.

- **RNF06 – Confiabilidade**: O sistema deve garantir a integridade das informações, impedindo o lançamento duplicado ou inconsistente de notas.

## 5. Casos de Uso

### Caso de Uso 1 – Cadastrar Aluno

**Ator Principal**: Administrador

**Descrição**: O administrador cadastra um novo aluno e o vincula a uma turma.

**Pré-condição**: Estar autenticado como administrador.

**Fluxo Principal**:
1. O administrador acessa o endpoint de cadastro de alunos.
2. Informa os dados obrigatórios (nome, e-mail, data de nascimento, turma).
3. O sistema valida as informações.
4. O sistema grava os dados no banco.
5. O sistema retorna sucesso e o ID do aluno criado.

**Fluxo Alternativo**:
- 2a. Caso algum campo obrigatório esteja ausente, o sistema retorna erro de validação.

### Caso de Uso 2 – Lançar Notas

**Ator Principal**: Professor

**Descrição**: O professor insere as notas dos alunos vinculados às matérias sob sua responsabilidade.

**Pré-condição**: Estar autenticado como professor e vinculado à matéria.

**Fluxo Principal**:
1. O professor acessa o endpoint de lançamento de notas.
2. Seleciona a matéria e o aluno.
3. Registra as notas (ex.: nota1, nota2).
4. O sistema calcula automaticamente a média.
5. O sistema determina a situação final (aprovado, recuperação ou reprovado).
6. O sistema confirma a operação.

### Caso de Uso 3 – Consultar Notas

**Ator Principal**: Aluno

**Descrição**: O aluno consulta suas notas, médias e situação final.

**Pré-condição**: Estar autenticado como aluno.

**Fluxo Principal**:
1. O aluno acessa o endpoint de consulta de notas.
2. O sistema retorna as notas, médias e situação final por matéria.

## 6. Considerações Finais

Esta versão representa o MVP do sistema de Gerenciamento de Notas Escolares. O escopo cobre as funcionalidades essenciais para cadastro de usuários, gerenciamento acadêmico e lançamento de notas. Funcionalidades futuras poderão incluir histórico de desempenho, dashboards analíticos, relatórios completos e integração com sistemas externos de instituições de ensino.

## 7. Tecnologias Utilizadas

- [AdonisJS](https://adonisjs.com/) - Framework Node.js para construção de APIs RESTful
- PostgreSQL/MySQL - Banco de dados relacional
- JWT - Autenticação e autorização
- TypeScript - Tipagem estática para JavaScript

## 8. Rotas da API (RESTful)

A organização das rotas segue o padrão /api/v1.

### 8.1. Autenticação
- `POST   /api/v1/auth/login`
- `POST   /api/v1/auth/logout`

### 8.2. Usuários Administrativos (apenas ADMIN)

**Alunos**
- `GET    /api/v1/alunos`
- `GET    /api/v1/alunos/:id`
- `POST   /api/v1/alunos`
- `PUT    /api/v1/alunos/:id`
- `DELETE /api/v1/alunos/:id`

**Professores**
- `GET    /api/v1/professores`
- `GET    /api/v1/professores/:id`
- `POST   /api/v1/professores`
- `PUT    /api/v1/professores/:id`
- `DELETE /api/v1/professores/:id`

### 8.3. Turmas
- `GET    /api/v1/turmas`
- `GET    /api/v1/turmas/:id`
- `POST   /api/v1/turmas`
- `PUT    /api/v1/turmas/:id`
- `DELETE /api/v1/turmas/:id`

### 8.4. Matérias
- `GET    /api/v1/materias`
- `GET    /api/v1/materias/:id`
- `POST   /api/v1/materias`
- `PUT    /api/v1/materias/:id`
- `DELETE /api/v1/materias/:id`

### 8.5. Notas (acesso por PROFESSOR)
- `GET    /api/v1/notas`          (listar notas por filtros)
- `GET    /api/v1/notas/:id`      (detalhe de uma nota)
- `POST   /api/v1/notas`          (lançar nota)
- `PUT    /api/v1/notas/:id`      (atualizar nota)
- `DELETE /api/v1/notas/:id`

### 8.6. Consulta de Notas (ALUNO)
- `GET    /api/v1/aluno/notas`

## 9. Estrutura do Banco de Dados

A seguir estão as tabelas essenciais e seus relacionamentos.

### 9.1. Tabela: users

(Usada tanto para administrador, professor e aluno)

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| nome | string | obrigatório |
| email | string(unique) | obrigatório |
| senha | string | hash |
| role | enum | admin, professor, aluno |
| created_at | timestamp |  |
| updated_at | timestamp |  |

### 9.2. Tabela: turmas

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| nome | string | Ex.: 1º ano A |
| ano_letivo | integer |  |
| created_at | timestamp |  |
| updated_at | timestamp |  |

### 9.3. Tabela: alunos

(Estende users, usando relação 1–1)

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| user_id | integer | FK → users.id |
| turma_id | integer | FK → turmas.id |
| created_at | timestamp |  |
| updated_at | timestamp |  |

### 9.4. Tabela: professores

(Estende users também)

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| user_id | integer | FK → users.id |
| created_at | timestamp |  |
| updated_at | timestamp |  |

### 9.5. Tabela: materias

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| nome | string |  |
| turma_id | integer | FK → turmas.id |
| professor_id | integer | FK → professores.id |
| created_at | timestamp |  |
| updated_at | timestamp |  |

### 9.6. Tabela: notas

| Campo | Tipo | Observação |
|-------|------|------------|
| id | increments | PK |
| aluno_id | integer | FK → alunos.id |
| materia_id | integer | FK → materias.id |
| nota1 | decimal(4,2) |  |
| nota2 | decimal(4,2) |  |
| media | decimal(4,2) | calculada automaticamente |
| situacao | enum | aprovado, recuperacao, reprovado |
| created_at | timestamp |  |
| updated_at | timestamp |  |

## 10. Sugestão de Migrations (AdonisJS)

A seguir estão as migrations essenciais, no formato correto do AdonisJS (TypeScript).

### 10.1. Migration: users

```typescript
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('email').unique().notNullable()
      table.string('senha').notNullable()
      table.enum('role', ['admin', 'professor', 'aluno']).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### 10.2. Migration: turmas

```typescript
export default class Turmas extends BaseSchema {
  protected tableName = 'turmas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.integer('ano_letivo').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### 10.3. Migration: alunos

```typescript
export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('turma_id')
        .unsigned()
        .references('id')
        .inTable('turmas')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### 10.4. Migration: professores

```typescript
export default class Professores extends BaseSchema {
  protected tableName = 'professores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### 10.5. Migration: materias

```typescript
export default class Materias extends BaseSchema {
  protected tableName = 'materias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()

      table
        .integer('turma_id')
        .unsigned()
        .references('id')
        .inTable('turmas')
        .onDelete('CASCADE')

      table
        .integer('professor_id')
        .unsigned()
        .references('id')
        .inTable('professores')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### 10.6. Migration: notas

```typescript
export default class Notas extends BaseSchema {
  protected tableName = 'notas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('aluno_id')
        .unsigned()
        .references('id')
        .inTable('alunos')
        .onDelete('CASCADE')

      table
        .integer('materia_id')
        .unsigned()
        .references('id')
        .inTable('materias')
        .onDelete('CASCADE')

      table.decimal('nota1', 4, 2)
      table.decimal('nota2', 4, 2)
      table.decimal('media', 4, 2)
      table.enum('situacao', ['aprovado', 'recuperacao', 'reprovado'])

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

---

# Documentação do Projeto: API de Gerenciamento de Notas Escolares

## 1. Visão Geral do Sistema

API RESTful desenvolvida em **AdonisJS (TypeScript)** com banco de dados **PostgreSQL/MySQL**, responsável por gerenciar usuários (admin, professor, aluno), matérias, turmas e notas.

A API oferece endpoints seguros com autenticação via **JWT** e controle de acesso baseado em **roles**.

## 2. Diagrama Entidade-Relacionamento (ER)

A estrutura lógica do banco é composta pelas seguintes entidades:

- **users** (entidade-base de autenticação)
- **admins** (detalhes específicos de administradores)
- **professors** (vínculos e perfil de professores)
- **students** (perfil dos alunos)
- **subjects** (matérias)
- **classes** (turmas)
- **grades** (notas)

### Relações principais

- Um **user** pertence a um de três papéis: admin, professor ou aluno.
- Um **professor** pode ministrar várias matérias.
- Uma **matéria** pertence a uma turma e a um professor.
- Um **aluno** pertence a uma turma.
- Um **aluno** possui notas para várias matérias.

### Representação textual do diagrama ER

```
users (1) ---- (1) admins
     \---- (1) professors
     \---- (1) students

professors (1) ---- (N) subjects
classes (1) ---- (N) students
classes (1) ---- (N) subjects
subjects (1) ---- (N) grades
students (1) ---- (N) grades
```

## 3. Estrutura de Pastas (AdonisJS API Starter Kit)

```
project/
├─ app/
│  ├─ Controllers/
│  │  └─ Http/
│  │     ├─ AuthController.ts
│  │     ├─ AdminsController.ts
│  │     ├─ ProfessorsController.ts
│  │     ├─ StudentsController.ts
│  │     ├─ ClassesController.ts
│  │     ├─ SubjectsController.ts
│  │     └─ GradesController.ts
│  ├─ Models/
│  │  ├─ User.ts
│  │  ├─ Admin.ts
│  │  ├─ Professor.ts
│  │  ├─ Student.ts
│  │  ├─ Class.ts
│  │  ├─ Subject.ts
│  │  └─ Grade.ts
│  ├─ Middleware/
│  │  ├─ Auth.ts
│  │  ├─ AdminOnly.ts
│  │  ├─ ProfessorOnly.ts
│  │  └─ StudentOnly.ts
│  └─ Validators/
│     ├─ AuthValidator.ts
│     ├─ CreateUserValidator.ts
│     ├─ SubjectValidator.ts
│     ├─ GradeValidator.ts
│     └─ ClassValidator.ts
├─ database/
│  ├─ migrations/
│  └─ seeders/
├─ routes.ts
└─ config/
```

## 4. Controllers

### 4.1 AuthController

- login
- logout
- refresh token

### 4.2 AdminsController

- createUser (cria professor ou aluno)
- listUsers
- deleteUser
- manageClasses
- manageSubjects

### 4.3 ProfessorsController

- listMySubjects
- listStudentsBySubject

### 4.4 StudentsController

- getMyGrades
- getMySubjects

### 4.5 GradesController

- createOrUpdateGrade (professor)
- listGradesByStudent
- listGradesBySubject

## 5. Validators

### 5.1 AuthValidator

```json
{
  "email": "required, email",
  "password": "required, minLength: 6"
}
```

### 5.2 CreateUserValidator

```json
{
  "name": "required",
  "email": "required, email",
  "password": "required",
  "role": "required (admin, professor, student)"
}
```

### 5.3 GradeValidator

```json
{
  "grade1": "number",
  "grade2": "number",
  "student_id": "required",
  "subject_id": "required"
}
```

### 5.4 SubjectValidator

```json
{
  "name": "required",
  "class_id": "required",
  "professor_id": "required"
}
```

### 5.5 ClassValidator

```json
{
  "name": "required",
  "year": "required"
}
```

## 6. Rotas da API

### 6.1 Autenticação

```
POST /login
POST /logout
```

### 6.2 Admin

```
POST /admin/users
GET  /admin/users
DELETE /admin/users/:id
POST /admin/classes
POST /admin/subjects
```

### 6.3 Professor

```
GET /professor/subjects
GET /professor/subjects/:id/students
POST /professor/grades
```

### 6.4 Aluno

```
GET /student/grades
GET /student/subjects
```

## 7. Exemplos JSON para Requisições

### Login

```json
POST /login
{
  "email": "prof@escola.com",
  "password": "123456"
}
```

### Cadastro de Usuário (Admin)

```json
POST /admin/users
{
  "name": "Carlos Silva",
  "email": "carlos@escola.com",
  "password": "123456",
  "role": "professor"
}
```

### Lançar Nota (Professor)

```json
POST /professor/grades
{
  "student_id": 5,
  "subject_id": 3,
  "grade1": 8.5,
  "grade2": 7.0
}
```

### Resposta esperada

```json
{
  "average": 7.75,
  "status": "aprovado"
}
```

## 8. Regras de Negócio

- Apenas administradores criam usuários, matérias e turmas.
- Professores só podem lançar notas em matérias sob sua responsabilidade.
- Alunos só podem visualizar suas próprias notas.
- Média calculada automaticamente: `(grade1 + grade2) / 2`.
- Situação automática:

```
>= 7: aprovado
>= 5 e < 7: recuperação
< 5: reprovado
```

## 9. Conclusão

Este documento descreve a estrutura inicial do sistema, contendo banco de dados, rotas, regras, validações e arquitetura. Esta versão representa o MVP e poderá ser expandida com funcionalidades como:

- relatórios avançados
- envio de boletim por e-mail
- gráficos de desempenho
- painel administrativo web