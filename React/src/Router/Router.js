import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Registers from "../components/Registers";
import Login from "../components/Login";
import Posts from "./../components/Posts/Posts";
import PostList from "./../components/Posts/PostList";
import PostDetail from "./../components/Posts/PostDetail";
import PostWrite from "./../components/Posts/PostWrtie";
import PostEdit from "./../components/Posts/PostEdit";

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
