import { useDispatch } from 'react-redux'
import ContactRepository from '../../repository/ContactRepository'
import { addNotification } from '../../store/notification/notificationReducer'

interface ContactDeleteProps {
  readonly contactId: number
  readonly userId: number
  readonly afterSubmit?: () => void
}

export default function ContactDelete({ contactId, userId, afterSubmit }: ContactDeleteProps) {
  const dispatch = useDispatch()

  function handleDelete() {
    ContactRepository.delete(userId, contactId).then(() => {
      if (afterSubmit) {
        dispatch(addNotification({
          title: 'Success',
          body: 'The contact has been deleted successfully.',
          type: 'success'
        }))
        setTimeout(() => afterSubmit(), 333)
      }
    }).catch(() => {
      dispatch(addNotification({
        title: 'Error',
        body: 'Oops! Something went wrong!',
        type: 'error'
      }))
    })
  }

  return (
    <button
      className="text-indigo-600 hover:text-indigo-900"
      onClick={handleDelete}
    >
      Delete <span className="sr-only">, {contactId}</span>
    </button>
  )
}
