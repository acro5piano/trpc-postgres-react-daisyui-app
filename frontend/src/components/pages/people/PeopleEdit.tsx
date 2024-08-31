import clsx from 'clsx'
import { Layout } from '../../Layout'
import { useForm } from 'react-hook-form'
import { trpc } from '../../../infra/trpc'
import { useLocation, useParams } from 'wouter'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const PeopleEdit: React.FC = () => {
  const personId = useParams().personId as string
  const res = trpc.personById.useQuery({ personId })
  const [, navigate] = useLocation()

  const updatePerson = trpc.updatePerson.useMutation({
    onSuccess() {
      toast.success('The people is updated')
      navigate('/people')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      nickname: '',
    },
  })

  useEffect(() => {
    if (res.data) {
      setValue('nickname', res.data.nickname)
    }
  }, [res, setValue])

  const onSubmit = handleSubmit(async (person) =>
    updatePerson.mutate({ personId, person }),
  )

  return (
    <Layout>
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="flex justify-end">
            <button className="da-btn da-btn-primary">
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
          <label className="da-form-control w-full max-w-xs">
            <span className="da-label-text">Nickname</span>
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
