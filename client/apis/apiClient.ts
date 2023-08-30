import request from 'superagent'
import { NewListItem, ListItem } from '../../models/List'

const url = '/api/v1/items'

export async function getAllListItems() {
  const response = await request.get(url)
  return response.body as ListItem[]
}

export async function addListItem(listItem: NewListItem): Promise<void> {
  await request.post(url).send(listItem)
}

export async function deleteListItem(id: number): Promise<void> {
  await request.delete(`${url}/${id}`)
}
