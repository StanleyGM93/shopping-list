/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('list', function (table) {
    table.increments('id')
    table.string('item').notNullable()
    table.integer('quantity')
    table.index(['item', 'quantity'], 'item_quantity_index')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('list')
}
