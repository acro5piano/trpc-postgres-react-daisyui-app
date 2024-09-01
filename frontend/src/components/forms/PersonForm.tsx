import { useForm } from 'react-hook-form'
import {
  PersonInputSchema,
  PersonInputType,
} from '../../../../server/src/models'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

type PersonFormProps = {
  defaultValues?: PersonInputType
  onSubmit: (value: PersonInputType) => unknown
}

export const PersonForm: React.FC<PersonFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonInputType>({
    resolver: zodResolver(PersonInputSchema),
    defaultValues,
  })

  const onSubmitForm = handleSubmit(async (value) => {
    await onSubmit(value)
  })

  return (
    <form onSubmit={onSubmitForm}>
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
          {...register('nickname')}
        />
        <span className="da-label-text-alt text-red-600">
          {errors.nickname?.message}
        </span>
      </label>
    </form>
  )
}
