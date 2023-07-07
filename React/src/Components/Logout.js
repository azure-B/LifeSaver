import axios from "axios";
import { SERVER } from "../lib/config";

function Logout() {
  const logout = () => {
    axios
      .get(`${SERVER}/api/logout`, { withCredentials: true })
      .then((result) => {
        alert(result.data.message);
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
