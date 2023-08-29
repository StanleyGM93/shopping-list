import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteListItem } from '../apis/apiClient'
import { ListItem } from '../../models/List'

export default function Item(props: ListItem) {
  const queryClient = useQueryClient()
  const deleteItemMutation = useMutation(deleteListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleDelete() {
    deleteItemMutation.mutate(props.id)
  }

  return (
    <li>
      <p>
        {props.item} -- {props.quantity}
      </p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}
