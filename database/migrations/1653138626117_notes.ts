import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Notes extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('content').notNullable().defaultTo('')
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.integer('folder_id').unsigned().references('folders.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
