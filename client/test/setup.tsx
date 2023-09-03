import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../components/App'
import NewItemForm from '../components/NewItemForm'

beforeEach(cleanup)
expect.extend(matchers)

function getQueryClient() {
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
  return queryClient
}

export function renderApp() {
  const queryClient = getQueryClient()

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )

  return screen
}

export function renderNewItemForm() {
  const queryClient = getQueryClient()

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <NewItemForm />
    </QueryClientProvider>
  )

  return screen
}
