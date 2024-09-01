import {
  createTRPCReact,
  httpBatchLink,
  TRPCClientError,
  TRPCLink,
} from '@trpc/react-query'
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
              'x-client': 'trpc',
            }
          },
        }),
      ],
    }),
  )
  return trpcClient
}

export const errorToastLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value)
        },
        error(err) {
          try {
            const errors: Error[] = JSON.parse(err.message)
            toast.error(
              errors.map((e: any) => `${e.path}: ${e.message}`).join(', '),
            )
          } catch {
            toast.error(err.message)
          }
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
