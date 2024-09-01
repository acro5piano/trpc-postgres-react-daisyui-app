import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { router } from './trpc'
import cors from 'cors'
import { personRouter } from './routes/personRouter'

const appRouter = router({
  person: personRouter,
})

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})
server.listen(3000)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
