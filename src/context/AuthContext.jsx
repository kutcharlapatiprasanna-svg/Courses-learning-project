
import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { authservice } from "../services/authServices";



export const AuthContext = createContext(null);

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("authToken")
  );

  const [user, setUser] = useState(getStoredUser);

  const isAuthenticated = Boolean(token);

  const login = useCallback(({ token: newToken, user: newUser }) => {
    if (!newToken) {
      throw new Error("Authentication token is missing.");
    }

    localStorage.setItem("authToken", newToken);

    if (newUser) {
      localStorage.setItem("authUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("authUser");
    }

    setToken(newToken);
    setUser(newUser ?? null);
  }, []);

  const logout = useCallback(() => {
    // Clear storage and update React state even if the service fails.
    try {
      authservice.logout();
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      setToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [token, user, isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
