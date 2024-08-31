import { Route, Switch } from 'wouter'
import { PeopleList } from './components/pages/people/PeopleList'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc, useQueryClient, useTrpcClient } from './infra/trpc'
import { PeopleEdit } from './components/pages/people/PeopleEdit'
import { PeopleNew } from './components/pages/people/PeopleNew'

function App() {
  const queryClient = useQueryClient()
  const trpcClient = useTrpcClient()

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/people/:peopleId/edit" component={PeopleEdit} />
          <Route path="/people/new" component={PeopleNew} />
          <Route path="/people" component={PeopleList} />

          <Route>404: No such page!</Route>
        </Switch>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
