import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'
import { db } from './db'
import { z } from 'zod'
import cors from 'cors'
import { TRPCError } from '@trpc/server'

const appRouter = router({
  personList: publicProcedure.query(async () => {
    return db.selectFrom('person').selectAll().execute()
  }),
  createPerson: publicProcedure
    .input(z.object({ nickname: z.string().min(0).default('unnamed') }))
    .mutation(async ({ input }) => {
      if (input.nickname === 'a') {
        throw new TRPCError({
          message: 'not A hotel!',
          code: 'UNPROCESSABLE_CONTENT',
        })
      }
      return db
        .insertInto('person')
        .values(input)
        .returningAll()
        .executeTakeFirstOrThrow()
    }),
})

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})
server.listen(3000)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
