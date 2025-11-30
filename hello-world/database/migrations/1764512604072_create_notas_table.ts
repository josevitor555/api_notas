import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('aluno_id').unsigned().references('id').inTable('alunos').onDelete('CASCADE')
      table.integer('materia_id').unsigned().references('id').inTable('materias').onDelete('CASCADE')
      table.decimal('nota1', 4, 2).nullable()
      table.decimal('nota2', 4, 2).nullable()
      table.decimal('media', 4, 2).nullable()
      table.enum('situacao', ['aprovado', 'recuperacao', 'reprovado']).nullable()
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}