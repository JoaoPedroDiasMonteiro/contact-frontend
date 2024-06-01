import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
  notifications: NotificationInterface[]
}

interface NotificationPayload extends Omit<NotificationInterface, 'id' | 'duration'> {
  title: string
  body: string
  actions?: NotificationAction[]
  imageUrl?: string
  type?: 'image' | 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

const INITIAL_STATE: NotificationState = {
  notifications: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: INITIAL_STATE,
  reducers: {
    addNotification(state: NotificationState, action: PayloadAction<NotificationPayload>) {
      const duration = action.payload.duration ??= 3456

      const notification = {
        ...action.payload,
        id: Date.now(),
        duration: duration
      }

      state.notifications.push(notification)
    },
    removeNotification(state: NotificationState, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter((notification) => {
        return notification.id !== action.payload
      })
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer