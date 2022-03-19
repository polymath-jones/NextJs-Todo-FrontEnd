import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext({ user: "", token: "", loggedIn: false });
const AuthDispatchContext = createContext((payload: any) => {});

function AuthProvider({ children }: any) {
  const [authDetails, setAuthDetails] = useState({
    user: "",
    token: "",
    loggedIn: false,
  });

  return (
    <AuthContext.Provider value={authDetails}>
      <AuthDispatchContext.Provider value={setAuthDetails}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthDispatchContext, AuthProvider };
