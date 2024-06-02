import { Outlet, ScrollRestoration } from 'react-router-dom';
import NotificationContainer from '../components/Notification/NotificationContainer';
import Header from '../components/Header';

function App() {
  return (
    <>
      <Header />
      <ScrollRestoration />
      <NotificationContainer />
      <Outlet />
      {/* footer */}
    </>
  )
}

export default App
