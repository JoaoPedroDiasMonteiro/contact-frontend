import { useSelector } from "react-redux";
import { NotificationState } from "../../../store/notification/notificationReducer";

export default function useNotification() {
  const { notifications } = useSelector((state: any) => state.notification) as NotificationState

  return notifications
}