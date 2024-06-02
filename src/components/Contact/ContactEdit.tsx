import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ContactRepository from '../../repository/ContactRepository'
import { addNotification } from '../../store/notification/notificationReducer'
import getError from '../../utils/getError'
import BaseButton from '../Ui/Button/BaseButton'
import Input from '../Ui/Input/Input'
import Modal from '../Ui/Modal'

interface ContactEditProps {
  readonly contact: Contact
  readonly open: boolean
  readonly closeOpen: () => void
  readonly afterSubmit?: () => void
}

export default function ContactEdit({ contact, open, closeOpen, afterSubmit }: ContactEditProps) {
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      type: contact.type,
      value: contact.value,
    },
    onSubmit: (values, helpers) => {
      setErrors([])

      ContactRepository.update(contact.user_id, contact.id, values).then(() => {
        closeModal()
        dispatch(addNotification({
          title: 'Success',
          body: 'Contact updated successfully!',
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
      type: contact.type,
      value: contact.value,
    })
  }, [contact])

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
          Edit Contact #{contact.id}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pb-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Input
            label='Type'
            error={getError(errors, 'type')}
            {...formik.getFieldProps('type')}
          />

          <Input
            label='Value'
            error={getError(errors, 'value')}
            {...formik.getFieldProps('value')}
          />

          <BaseButton type="submit" loading={formik.isSubmitting}>
            Save
          </BaseButton>
        </form>
      </div>
    </Modal>
  )
}
