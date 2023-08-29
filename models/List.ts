export interface NewListItem {
  item: string
  quantity: number
}

export interface ListItem extends NewListItem {
  id: number
}
