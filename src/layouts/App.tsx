import { Outlet, ScrollRestoration } from 'react-router-dom';
import NotificationContainer from '../components/Notification/NotificationContainer';

function App() {
  return (
    <>
      {/* header */}
      <ScrollRestoration />
      <NotificationContainer />
      <Outlet />
      {/* footer */}
    </>
  )
}

export default App
