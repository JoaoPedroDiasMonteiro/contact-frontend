import { createBrowserRouter } from "react-router-dom";
import App from "./layouts/App";
import HomePage from "./pages/HomePage";
import { UserPage } from "./pages/UserPage/Index";
import { userLoader } from "./pages/UserPage/userLoader";
import ErrorCode from "./components/Ui/ErrorCode";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorCode fullScreen code="404" />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/user/:user',
        loader: userLoader,
        element: <UserPage />
      },
    ]
  },
]);

export default routes