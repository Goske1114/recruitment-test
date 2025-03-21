import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('')

  // clear errors after 5 seconds
  useEffect(() => {
    if (err !== '') {
      const timer = setTimeout(() => {
        setErr('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  const signup = async (user) => {
    if (user.password !== user.password2) {
      setErr('Password Confirm failed')
      return
    }
    try {
      const res = await registerRequest(user);
      setUser(res);
      setIsAuthenticated(true);
    } catch (error) {
      setErr(error.message)
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res);
      setIsAuthenticated(true);
    } catch (error) {
      setErr(error.message)
    }
  };

  const router = useRouter()
  const logout = async () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    await logoutRequest()
    router.push('/login')
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true)
        const res = await verifyTokenRequest();
        if (!res) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        err,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
