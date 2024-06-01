import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import { removeNotification } from '../../../store/notification/notificationReducer'
import NotificationItemActions from './NotificationItemActions'
import NotificationItemIcon from './NotificationItemIcon'
import { useDispatch } from 'react-redux'

interface NotificationItemProps {
  readonly notification: NotificationInterface
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const [show, setShow] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(closeNotification, notification.duration)

    return () => clearTimeout(timeout)
  }, []) // eslint-disable-line

  function closeNotification() {
    setShow(false)

    setTimeout(() => {
      dispatch(removeNotification(notification.id))
    }, 289);
  }

  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-300 !mt-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <NotificationItemIcon notification={notification} />
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.body}</p>
                <NotificationItemActions close={closeNotification} notification={notification} />
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={closeNotification}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
