import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import cors from 'cors'
import { TRPCError } from '@trpc/server'
import { PersonInputSchema } from './models'
import { db, person } from './db'
import { eq } from 'drizzle-orm'

const appRouter = router({
  personList: publicProcedure.query(async () => {
    return db.select().from(person)
  }),
  personById: publicProcedure
    .input(z.object({ personId: z.string() }))
    .query(async ({ input }) => {
      return db.select().from(person).where(eq(person.id, input.personId))
    }),
  createPerson: publicProcedure
    .input(PersonInputSchema)
    .mutation(async ({ input }) => {
      if (input.nickname === 'a') {
        throw new TRPCError({
          message: 'Invalid nickname!',
          code: 'UNPROCESSABLE_CONTENT',
        })
      }
      return db.insert(person).values(input).returning()
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
