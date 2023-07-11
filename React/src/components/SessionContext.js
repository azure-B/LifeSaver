import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  return (
    <SessionContext.Provider value={{ userId, setUserId }}>
      {children}
    </SessionContext.Provider>
  );
};
