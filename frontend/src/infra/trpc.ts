import { createTRPCReact, httpBatchLink, TRPCLink } from '@trpc/react-query'
import { observable } from '@trpc/server/observable'

import type { AppRouter } from '../../../server/src/app'
import { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const trpc = createTRPCReact<AppRouter>()

export const useQueryClient = () => {
  const [queryClient] = useState(() => new QueryClient())
  return queryClient
}

export const useTrpcClient = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        errorToastLink,
        httpBatchLink({
          url: 'http://127.0.0.1:3000/',
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

export const errorToastLink: TRPCLink<AppRouter> = () => {
  // here we just got initialized in the app - this happens once per app
  // useful for storing cache for instance
  return ({ next, op }) => {
    // this is when passing the result to the next link
    // each link needs to return an observable which propagates results
    return observable((observer) => {
      console.log('performing operation:', op)
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value)
        },
        error(err) {
          toast.error(err.message)
          observer.error(err)
        },
        complete() {
          observer.complete()
        },
      })
      return unsubscribe
    })
  }
}
