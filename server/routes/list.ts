import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const listItems = await db.getAllListItems()
    res.json(listItems)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  const newListItem = req.body
  try {
    const returnedNewListItem = await db.addListItem(newListItem)
    res.status(201).json(returnedNewListItem)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteListItem(id)
    res.sendStatus(204)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    res.sendStatus(500)
  }
})

export default router
