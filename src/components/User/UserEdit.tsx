import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import UserRepository from '../../repository/UserRepository'
import { addNotification } from '../../store/notification/notificationReducer'
import getError from '../../utils/getError'
import BaseButton from '../Ui/Button/BaseButton'
import Input from '../Ui/Input/Input'
import Modal from '../Ui/Modal'

interface UserEditProps {
  readonly user: User
  readonly open: boolean
  readonly closeOpen: () => void
  readonly afterSubmit?: () => void
}

export default function UserEdit({ user, open, closeOpen, afterSubmit }: UserEditProps) {
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: '',
      password_confirmation: ''
    },
    onSubmit: (values, helpers) => {
      setErrors([])

      UserRepository.update(user.id, values).then(() => {
        closeModal()
        dispatch(addNotification({
          title: 'Success',
          body: 'User updated successfully!',
          type: 'success'
        }))
      }).catch(({ response }) => {
        setErrors(response?.data?.errors ?? [])
        helpers.setSubmitting(false)
      })

      if (afterSubmit) {
        setTimeout(() => afterSubmit(), 333);
      }
    }
  })

  useEffect(() => {
    formik.setValues({
      name: user.name,
      email: user.email,
      password: '',
      password_confirmation: ''
    })
  }, [user])

  function closeModal() {
    closeOpen()
    setTimeout(() => {
      formik.resetForm()
      setErrors([])
    }, 200);
  }

  return (
    <Modal open={open} setOpen={closeModal}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit User #{user.id}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pb-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Input
            label='Email address'
            type='email'
            error={getError(errors, 'email')}
            {...formik.getFieldProps('email')}
          />

          <Input
            label='Name'
            error={getError(errors, 'name')}
            {...formik.getFieldProps('name')}
          />

          <Input
            label='Password'
            type='password'
            error={getError(errors, 'password')}
            {...formik.getFieldProps('password')}
          />

          <Input
            label='Password confirmation'
            type='password'
            error={getError(errors, 'password')}
            {...formik.getFieldProps('password_confirmation')}
          />

          <BaseButton type="submit" loading={formik.isSubmitting}>
            Save
          </BaseButton>
        </form>
      </div>
    </Modal>
  )
}
