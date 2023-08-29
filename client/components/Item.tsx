import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteListItem } from '../apis/apiClient'
import { ListItem } from '../../models/List'

interface Item {
  listItem: ListItem
}

export default function Item({ listItem }: Item) {
  const queryClient = useQueryClient()
  const deleteItemMutation = useMutation(deleteListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteItemMutation.mutate(listItem.id)
  }

  return (
    <li>
      <p>
        {listItem.item}, quantity: {listItem.quantity}
      </p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}
