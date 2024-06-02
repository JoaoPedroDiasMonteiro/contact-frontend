import { useDispatch } from 'react-redux'
import ContactRepository from '../../repository/ContactRepository'
import { addNotification } from '../../store/notification/notificationReducer'
import { useState } from 'react'
import Modal from '../Ui/Modal'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { Button, DialogTitle } from '@headlessui/react'
import BaseButton from '../Ui/Button/BaseButton'

interface ContactDeleteProps {
  readonly contactId: number
  readonly userId: number
  readonly afterSubmit?: () => void
}

export default function ContactDelete({ contactId, userId, afterSubmit }: ContactDeleteProps) {
  const dispatch = useDispatch()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleDelete() {
    setIsLoading(true)

    ContactRepository.delete(userId, contactId).then(() => {
      setTimeout(() => {
        dispatch(addNotification({
          title: 'Success',
          body: 'The contact has been deleted successfully.',
          type: 'success'
        }))
      }, 333);

      if (afterSubmit) {
        afterSubmit()
      }
    }).catch(() => {
      dispatch(addNotification({
        title: 'Error',
        body: 'Oops! Something went wrong!',
        type: 'error'
      }))

      setShowConfirmation(false)
      setIsLoading(false)
    })
  }

  return (
    <>
      <button
        className="text-indigo-600 hover:text-indigo-900"
        onClick={() => setShowConfirmation(true)}
      >
        Delete <span className="sr-only">, {contactId}</span>
      </button>

      <Modal open={showConfirmation} setOpen={setShowConfirmation}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Remove Contact
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove this contact? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <BaseButton
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={handleDelete}
            loading={isLoading}
          >
            Yes, I'm sure
          </BaseButton>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setShowConfirmation(false)}
            data-autofocus
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}
