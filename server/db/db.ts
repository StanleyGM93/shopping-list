import db from './connection.ts'
import { NewListItem, ListItem } from '../../models/List.ts'

export function getAllListItems(): Promise<ListItem[]> {
  return db('list').select()
}

export function addListItem(newItem: NewListItem) {
  return db('list').insert(newItem)
}

export function deleteListItem(id: number) {
  return db('list').delete().where('id', id)
}
