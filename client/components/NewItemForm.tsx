import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addListItem } from '../apis/apiClient'

const initialData = {
  item: '',
  quantity: 0,
}

export default function NewItemForm() {
  const [formData, setFormData] = useState(initialData)
  const queryClient = useQueryClient()
  const newItemMutation = useMutation(addListItem, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    newItemMutation.mutate(formData)
    setFormData(initialData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add an item</h3>
      <div className="form-item">
        <label htmlFor="quantity">Item:</label>
        <input
          type="text"
          name="item"
          id="item"
          value={formData.item}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add item</button>
    </form>
  )
}
