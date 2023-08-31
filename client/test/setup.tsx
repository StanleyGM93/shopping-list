import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../components/App'

beforeEach(cleanup)
expect.extend(matchers)

export function renderApp() {
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

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )

  return screen
}
