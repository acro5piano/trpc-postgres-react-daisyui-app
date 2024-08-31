import { createTRPCReact, httpBatchLink } from '@trpc/react-query'

import type { AppRouter } from '../../../server/src/app'
import { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

export const trpc = createTRPCReact<AppRouter>()

export const useQueryClient = () => {
  const [queryClient] = useState(() => new QueryClient())
  return queryClient
}

export const useTrpcClient = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: 'Bearer hogehoge',
            }
          },
        }),
      ],
    }),
  )
  return trpcClient
}
