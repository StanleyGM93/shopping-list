import request from 'superagent'
import { NewListItem, ListItem } from '../../models/List'

export async function getAllListItems() {
  const response = await request.get('/')
  return response.body as ListItem[]
}

export async function addListItem(listItem: NewListItem): Promise<void> {
  await request.post('/').send(listItem)
}

export async function deleteListItem(id: number): Promise<void> {
  await request.delete(`/${id}`)
}
