import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Registers from "../components/Registers";
import Login from "../components/Login";

const RouterData = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Registers></Registers>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default RouterData;
