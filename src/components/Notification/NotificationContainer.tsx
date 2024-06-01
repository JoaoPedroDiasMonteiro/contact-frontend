import useNotification from '../../hooks/selectors/notification/notificationSelector'
import NotificationItem from './NotificationItem/NotificationItem'

export default function NotificationContainer() {
  const notifications = useNotification()

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex flex-col gap-4 items-end px-4 py-6 sm:items-start sm:p-6 z-20 transition-all"
    >
      {notifications.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </div>
  )
}
