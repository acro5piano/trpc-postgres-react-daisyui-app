import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'
import { db } from './db'

const appRouter = router({
  personList: publicProcedure.query(async () => {
    return db.selectFrom('person').selectAll().execute()
  }),
})

const server = createHTTPServer({
  router: appRouter,
})
server.listen(3000)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
