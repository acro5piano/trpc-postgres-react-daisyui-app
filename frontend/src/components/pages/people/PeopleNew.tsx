import { useForm } from 'react-hook-form'
import { Layout } from '../../Layout'
import clsx from 'clsx'
import { trpc } from '../../../infra/trpc'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'

export const PeopleNew: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nickname: '',
    },
  })
  const creator = trpc.createPerson.useMutation({
    onSuccess() {
      toast.success('A person has been created')
      navigate('/people')
    },
  })
  const [, navigate] = useLocation()
  const onSubmit = handleSubmit(async (input) => creator.mutate(input))

  return (
    <Layout>
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="flex justify-end">
            <button className="da-btn da-btn-primary">
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
          <label className="da-form-control w-full max-w-xs">
            <div className="da-label">
              <span className="da-label-text">Nickname</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className={clsx(
                'da-input da-input-bordered w-full max-w-xs',
                errors.nickname && 'da-input-error',
              )}
              {...register('nickname', { required: 'Required' })}
            />
            <span className="da-label-text-alt text-red-600">
              {errors.nickname?.message}
            </span>
          </label>
        </form>
      </div>
    </Layout>
  )
}
