import db from './connection.ts'
import { NewListItem, ListItem } from '../../models/List.ts'

export function getAllListItems(): Promise<ListItem[]> {
  return db('list').select()
}

export function addListItem(newItem: NewListItem): Promise<number[]> {
  return db('list').insert(newItem).select('*')
}

export async function deleteListItem(id: number): Promise<number> {
  return db('list').delete().where('id', id)
}
