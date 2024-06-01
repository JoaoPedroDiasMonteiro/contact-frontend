interface NotificationItemProps {
  readonly notification: NotificationInterface
  readonly close: CallableFunction
}

export default function NotificationItemActions({ notification, close }: NotificationItemProps) {
  const coloredButtonClasses = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
  const baseButtonClasses = "inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm "
  const primaryButtonClasses = coloredButtonClasses + "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
  const successButtonClasses = coloredButtonClasses + "text-white bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
  const infoButtonClasses = coloredButtonClasses + "text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600"
  const warningButtonClasses = coloredButtonClasses + "text-white bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600"
  const errorButtonClasses = coloredButtonClasses + "text-white bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
  const defaultButtonClasses = "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

  function getButtonClass(type: string) {
    switch (type) {
      case 'primary': return primaryButtonClasses
      case 'success': return successButtonClasses
      case 'info': return infoButtonClasses
      case 'warning': return warningButtonClasses
      case 'error': return errorButtonClasses
      default:
        return defaultButtonClasses
    }
  }

  function handleNotificationAction(callback: CallableFunction) {
    callback()
    close()
  }

  return (
    <div className={`mt-4 flex gap-3 ${!notification.actions?.length ? 'hidden' : ''}`}>
      {notification.actions?.map((action, index) => (
        <button
          key={action.name + index}
          type="button"
          onClick={() => handleNotificationAction(action.callback)}
          className={`
              ${baseButtonClasses}
              ${getButtonClass(action.color)}
          `}
        >
          {action.name}
        </button>
      ))}
    </div>
  )
}
