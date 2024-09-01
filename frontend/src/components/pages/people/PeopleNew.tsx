import { Layout } from '../../Layout'
import { trpc } from '../../../infra/trpc'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'
import { PersonForm } from '../../forms/PersonForm'

export const PeopleNew: React.FC = () => {
  const [, navigate] = useLocation()
  const createPerson = trpc.createPerson.useMutation({
    onSuccess() {
      toast.success('A person has been created')
      navigate('/people')
    },
  })

  return (
    <Layout>
      <div className="">
        <PersonForm onSubmit={createPerson.mutate} />
      </div>
    </Layout>
  )
}
