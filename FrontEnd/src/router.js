import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import { userLoader } from "./loaders/userLoader";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ResultPage from "./pages/ResultPage/ResultPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        //path: "home",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "results",
        element: <ResultPage />,
      },
    ],
  },
]);
