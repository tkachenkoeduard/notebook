import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Note from 'App/Models/Note'

export default class Folder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public order: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Note)
  public notes: HasMany<typeof Note>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
