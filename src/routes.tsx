import { createBrowserRouter } from "react-router-dom";
import App from "./layouts/App";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/user/:user',
        element: <UserPage />
      },
    ]
  },
]);

export default routes