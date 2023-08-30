import * as db from './db.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllListItems', () => {
  it('returns an array of objects', async () => {
    const allItems = await db.getAllListItems()
    const isArray = Array.isArray(allItems)
    const firstItem = allItems[0]
    expect(isArray).toBe(true)
    expect(allItems).toHaveLength(3)
    expect(firstItem.id).toBe(1)
    expect(firstItem.item).toBe('bananas')
  })
})

describe('addListItem', () => {
  it('adds a new item into the database', async () => {
    const newItem = { item: 'carrots', quantity: 9 }
    await db.addListItem(newItem)
    const allItems = await db.getAllListItems()
    const addedItem = allItems[allItems.length - 1]
    expect(allItems).toHaveLength(4)
    expect(addedItem?.item).toBe('carrots')
  })
})

describe('deleteListItem', () => {
  it('removes an item by id', async () => {
    await db.deleteListItem(2)
    const allItems = await db.getAllListItems()
    expect(allItems).toHaveLength(2)
    expect(allItems[1].id).not.toBe(2)
  })
})

afterAll(async () => {
  await connection.destroy()
})
