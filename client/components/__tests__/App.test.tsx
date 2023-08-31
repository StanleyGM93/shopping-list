//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import { renderApp } from '../../test/setup.tsx'

describe('<App/>', () => {
  it('should render a list of items', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/items')
      .reply(200, [
        {
          id: 1,
          item: 'bananas',
          quantity: 1,
        },
        {
          id: 2,
          item: 'apples',
          quantity: 2,
        },
      ])

    renderApp()

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Loading the shopping list/i)
    )

    const list = screen.getByRole('list')
    const listItems = within(list).getAllByRole('listitem')
    const firstitemTextContent = listItems[0].textContent

    expect(listItems).toHaveLength(2)
    expect(firstitemTextContent).toContain('bananas')
    expect(scope.isDone()).toBe(true)
  })
  it('shows loading text', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/items')
      .reply(200, [
        {
          id: 1,
          item: 'bananas',
          quantity: 1,
        },
        {
          id: 2,
          item: 'apples',
          quantity: 2,
        },
      ])

    renderApp()

    await waitFor(() => screen.getByText(/Loading the shopping list/))

    const loadingText = screen.getByText(/Loading the shopping list/)

    expect(loadingText).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('shows error text when appropriate', async () => {
    const scope = nock('http://localhost').get('/api/v1/items').reply(500)

    renderApp()

    await waitFor(() =>
      screen.findByText(/There was an error trying to get the shopping list/i)
    )

    expect(scope.isDone()).toBe(true)
  })

  it('should delete an item when button is clicked', async () => {
    const initialLoadingScope = nock('http://localhost')
      .get('/api/v1/items')
      .reply(200, [
        {
          id: 1,
          item: 'bananas',
          quantity: 1,
        },
        {
          id: 2,
          item: 'apples',
          quantity: 2,
        },
      ])

    renderApp()

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Loading the shopping list/i)
    )

    // Todo, simulate user deleting an item from the list

    const user = userEvent.setup()
    const deleteButton = screen.getAllByRole('button', { name: 'Delete' })

    const listItems = screen.getAllByRole('listitem')

    expect(listItems[1]).toBeInTheDocument()
    expect(initialLoadingScope.isDone()).toBe(true)
  })
})
