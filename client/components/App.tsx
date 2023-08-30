import { useQuery } from '@tanstack/react-query'

import NewItemForm from './NewItemForm'
import Item from './Item'
import { getAllListItems } from '../apis/apiClient'

function App() {
  const {
    data: listItems,
    isLoading,
    isError,
  } = useQuery(['list-items'], getAllListItems)

  if (isError) {
    return <p>There was an error trying to get the shopping list</p>
  }

  if (isLoading) {
    return <p>Loading the shopping list...</p>
  }

  if (!listItems) {
    return <p>No list items</p>
  }

  const renderListItems = listItems.map((listItem) => (
    <Item listItem={listItem} key={listItem.id} />
  ))

  return (
    <>
      <header className="header">
        <h1>My shopping list 🛒📃</h1>
      </header>
      <section className="main">
        <NewItemForm />
        <ul>{renderListItems}</ul>
      </section>
    </>
  )
}

export default App
