import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../server'
import * as db from '../db/db.ts'
import { ListItem, NewListItem } from '../../models/List.ts'

interface NewItem {
  newitem: NewListItem
}

// Is there a way to test the bad path of all db functions

// How can I test this with more precision,
// e.g. test whether an object was used in request

vi.mock('../db/db.ts')

describe('get /', () => {
  it('returns list of items', async () => {
    vi.mocked(db.getAllListItems).mockImplementation(async () => {
      return [
        {
          id: 1,
          item: 'bananas',
          quantity: 1,
        },
        {
          id: 2,
          item: 'apples',
          quantity: 2,
        },
      ]
    })

    const response = await request(server).get('/api/v1/items')
    expect(response.statusCode).toBe(200)
    expect(db.getAllListItems).toHaveBeenCalledOnce()
    expect(response.body.length).toBe(2)
  })

  it('responds with an error when db fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.getAllListItems).mockImplementation(async () => {
      throw new Error()
    })

    const response = await request(server).get('/api/v1/items')
    expect(console.error).toHaveBeenCalled()
    expect(response.statusCode).toBe(500)
  })
})

describe('post /', () => {
  it('adds an item to the database', async () => {
    vi.mocked(db.addListItem).mockImplementation(async () => {
      return [10]
    })

    const response = await request(server).post('/api/v1/items')
    expect(response.statusCode).toBe(201)
    expect(db.addListItem).toHaveBeenCalled()
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('responds with an error when db fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.getAllListItems).mockImplementation(async () => {
      throw new Error()
    })

    const response = await request(server).get('/api/v1/items')
    expect(console.error).toHaveBeenCalled()
    expect(response.statusCode).toBe(500)
  })
})

describe('delete /:id', () => {
  it('deletes an item using :id', async () => {
    vi.mocked(db.deleteListItem).mockImplementation(async (id: number) => {
      return id
    })

    const itemId = 5
    const response = await request(server).delete(`/api/v1/items/${itemId}`)

    expect(response.statusCode).toBe(204)
    expect(db.deleteListItem).toHaveBeenCalledWith(itemId)
  })

  it('responds with an error when db fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.deleteListItem).mockImplementation(async () => {
      throw new Error()
    })

    const response = await request(server).get('/api/v1/items')
    expect(console.error).toHaveBeenCalled()
    expect(response.statusCode).toBe(500)
  })
})
