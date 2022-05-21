import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Folders extends BaseSchema {
  protected tableName = 'folders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
