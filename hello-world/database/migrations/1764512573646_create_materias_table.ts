import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.integer('turma_id').unsigned().references('id').inTable('turmas').onDelete('CASCADE')
      table.integer('professor_id').unsigned().references('id').inTable('professores').onDelete('CASCADE')
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}