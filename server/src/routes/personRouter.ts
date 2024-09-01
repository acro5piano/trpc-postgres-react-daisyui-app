import { z } from 'zod'
import { db } from '@server/db'
import { PersonInputSchema } from '@server/models/Person'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export const personRouter = router({
  personList: publicProcedure.query(async () => {
    return db.selectFrom('person').selectAll().execute()
  }),
  personById: publicProcedure
    .input(z.object({ personId: z.string().uuid() }))
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
        personId: z.string().uuid(),
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
