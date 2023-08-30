//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
  render,
} from '@testing-library/react'
import nock from 'nock'
import App from '../App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

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
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    await waitFor(() => screen.getByText(/Loading the shopping list/))

    expect(scope.isDone()).toBe(true)
  })
  it('shows error text when appropriate', async () => {
    const scope = nock('http://localhost').get('/api/v1/items').reply(500)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    await waitFor(() =>
      screen.findByText(/There was an error trying to get the shopping list/i)
    )

    expect(scope.isDone()).toBe(true)
  })
})
