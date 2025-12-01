import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type Situacao = 'aprovado' | 'recuperacao' | 'reprovado'

export default class Nota extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare alunoId: number

  @column()
  declare materiaId: number

  @column()
  declare nota1: number | null

  @column()
  declare nota2: number | null

  @column()
  declare media: number | null

  @column()
  declare situacao: Situacao | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}