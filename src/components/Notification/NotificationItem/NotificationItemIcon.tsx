import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'

interface NotificationItemIconProps {
  readonly notification: NotificationInterface
}

export default function NotificationItemIcon({ notification }: NotificationItemIconProps) {
  return (
    <div className="flex-shrink-0 pt-0.5">
      {notification.type === 'success' && (
        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
      )}
      {notification.type === 'info' && (
        <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
      )}
      {notification.type === 'warning' && (
        <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
      )}
      {notification.type === 'error' && (
        <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
      )}
      {notification.type === 'image' && notification.imageUrl && (
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={notification.imageUrl}
          alt="notification"
        />
      )}
    </div>
  )
}
