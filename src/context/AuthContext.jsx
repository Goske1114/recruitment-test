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
    try {  
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErr(error.response.data)
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErr(error.response.data)
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
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        console.log("$$$$$", cookies.token)
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        Cookies.remove('token')
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
