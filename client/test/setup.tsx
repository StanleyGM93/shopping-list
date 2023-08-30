import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

beforeEach(cleanup)
expect.extend(matchers)

// export function renderComponent(Component: string) {
//   const user = userEvent.setup()

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//     logger: {
//       log: console.log,
//       warn: console.warn,
//       error: () => {},
//     },
//   })

//   const container = render(
//     <QueryClientProvider client={queryClient}>
//       <Component />
//     </QueryClientProvider>
//   )
//   return { user, ...container }
// }
