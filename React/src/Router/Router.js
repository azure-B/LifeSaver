import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const RouterData = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default RouterData;
