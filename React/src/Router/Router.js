import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Registers from "../components/Registers";
import Login from "../components/Login";
import Posts from "./../Components/Posts/Posts";
import PostList from "./../Components/Posts/PostList";
import PostDetail from "./../Components/Posts/PostDetail";
import PostWrite from "./../Components/Posts/PostWrtie";
import PostEdit from "./../Components/Posts/PostEdit";

const RouterData = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/NoticeBoard",
        element: <Posts />,
        children: [
          { path: "", element: <PostList /> },
          { path: ":postId", element: <PostDetail /> },
          { path: "write", element: <PostWrite /> },
          { path: "edit/:postId", element: <PostEdit /> },
        ],
      },
    ],
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
