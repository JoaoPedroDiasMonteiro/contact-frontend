import { Provider } from 'react-redux'
import Home from './pages/Home'
import { store } from './store/index';
import NotificationContainer from './components/Notification/NotificationContainer';

function App() {
  return (
    <Provider store={store}>
      <NotificationContainer />
      <Home />
    </Provider>
  )
}

export default App
