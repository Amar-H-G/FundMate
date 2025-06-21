import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // ✅ Correct default import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Set user and axios headers if token exists
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token); // ✅ Use default-imported function
        setUser(decoded);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.error("Invalid token");
        logout(); // fallback if token is invalid
      }
    } else {
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const newToken = res.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      const newToken = res.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
