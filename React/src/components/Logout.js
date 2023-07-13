import axios from "axios";
import { SERVER } from "../lib/config";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get(`${SERVER}/api/logout`, { withCredentials: true })
      .then((result) => {
        alert(result.data.message);
        if (result.data.result === true) {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </>
  );
}
export default Logout;
