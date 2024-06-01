interface NotificationInterface {
    id: number
    title: string
    body: string
    actions?: NotificationAction[]
    imageUrl?: string
    type?: 'image' | 'success' | 'info' | 'warning' | 'error'
    duration: number
}

interface NotificationAction {
    name: string
    color: 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'
    callback: CallableFunction
}
