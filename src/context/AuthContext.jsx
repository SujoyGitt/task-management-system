import { createContext, useContext } from "react";

const AuthContext = createContext(undefined);

const useUserDetails = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserDetails must be used inside ContextProvider");
  }
  return context;
};

const ContextProvider = ({ children, data }) => {
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export { useUserDetails, ContextProvider };
