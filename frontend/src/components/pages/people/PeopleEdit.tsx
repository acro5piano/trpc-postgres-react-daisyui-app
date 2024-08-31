import clsx from 'clsx'
import { Layout } from '../../Layout'
import { useForm } from 'react-hook-form'

export const PeopleEdit: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nickname: '',
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    console.log(input)
  })

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
