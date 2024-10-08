import { Layout } from '@frontend/components/Layout'
import { trpc } from '@frontend/infra/trpc'
import { useLocation, useParams } from 'wouter'
import toast from 'react-hot-toast'
import { PersonForm } from '@frontend/components/forms/PersonForm'

export const PeopleEdit: React.FC = () => {
  const personId = useParams().personId as string
  const { data } = trpc.person.personById.useQuery({ personId })
  const [, navigate] = useLocation()

  const updatePerson = trpc.person.updatePerson.useMutation({
    onSuccess() {
      toast.success('The people is updated')
      navigate('/people')
    },
  })

  return (
    <Layout>
      <div className="">
        {data && (
          <PersonForm
            onSubmit={(person) => updatePerson.mutate({ personId, person })}
            defaultValues={data}
          />
        )}
      </div>
    </Layout>
  )
}
