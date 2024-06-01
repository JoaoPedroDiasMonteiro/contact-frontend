import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useFormik } from 'formik'
import { useState } from 'react'
import UserRepository from '../../repository/UserRepository'
import getError from '../../utils/getError'
import BaseButton from '../Ui/Button/BaseButton'
import Input from '../Ui/Input/Input'
import Modal from '../Ui/Modal'

export default function UserCreate() {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState([])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    onSubmit: (values, helpers) => {
      setErrors([])

      UserRepository.create(values).then(() => {
        closeModal()
      }).catch(({ response }) => {
        setErrors(response?.data?.errors ?? [])
        helpers.setSubmitting(false)
      })
    }
  })

  function closeModal() {
    setOpen(false)
    setTimeout(() => {
      formik.resetForm()
      setErrors([])
    }, 200);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        New User <PlusCircleIcon className="w-5 inline-block" />
      </button>

      <Modal open={open} setOpen={closeModal}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
              Sign in
            </BaseButton>
          </form>
        </div>
      </Modal>
    </>
  )
}
