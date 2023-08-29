/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('list').del()
  await knex('list').insert([
    { id: 1, item: 'bananas', quantity: 1 },
    { id: 2, item: 'apples', quantity: 2 },
    { id: 3, item: 'peaches', quantity: 2 },
  ])
}
