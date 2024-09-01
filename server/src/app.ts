import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'
import { db } from './db'
import { z } from 'zod'
import cors from 'cors'
import { TRPCError } from '@trpc/server'
import { PersonInputSchema } from './models/Person'

const appRouter = router({
  personList: publicProcedure.query(async () => {
    return db.selectFrom('person').selectAll().execute()
  }),
  personById: publicProcedure
    .input(z.object({ personId: z.string() }))
    .query(async ({ input }) => {
      return db
        .selectFrom('person')
        .selectAll()
        .where('id', '=', input.personId)
        .executeTakeFirstOrThrow()
    }),
  createPerson: publicProcedure
    .input(PersonInputSchema)
    .mutation(async ({ input }) => {
      if (input.nickname === 'fuck') {
        throw new TRPCError({
          message: 'Invalid nickname!',
          code: 'UNPROCESSABLE_CONTENT',
        })
      }
      return db
        .insertInto('person')
        .values(input)
        .returningAll()
        .executeTakeFirstOrThrow()
    }),
  updatePerson: publicProcedure
    .input(
      z.object({
        personId: z.string(),
        person: PersonInputSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return db
        .updateTable('person')
        .set(input.person)
        .where('id', '=', input.personId)
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
