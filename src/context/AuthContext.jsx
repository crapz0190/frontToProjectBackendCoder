/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import {
  loginRequest,
  registerRequest,
  verifyAccountRequest,
  forgotPassword,
  resetPassword,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { env } from "../utils/config";

export const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // ---------- USERS ---------

  const signup = async (values) => {
    try {
      const register = await registerRequest(values);
      if (register.status === 201) {
        const sendEmail = await verifyAccountRequest();
        setUser(register.data);
        // setIsAuthenticated(true);
        return sendEmail;
      } else {
        return undefined;
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error.name]);
    }
  };

  const signin = async (values) => {
    try {
      const login = await loginRequest(values);

      setIsAuthenticated(true);
      setUser(login.data);
      setUserRole(login.data.payload.role);

      const encryptedRole = CryptoJS.AES.encrypt(
        login.data.payload.role,
        env.SECRET_KEY_ROLE,
      ).toString();

      Cookies.set("userRole", encryptedRole);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error.name]);
    }
  };

  const sendEmailPwd = async (values) => {
    try {
      const email = await forgotPassword(values);
      setUser(email.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error.name]);
    }
  };

  const confirmPwd = async (uid, token, obj) => {
    try {
      await resetPassword(uid, token, obj);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error.name]);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest(); // Hacer la solicitud al servidor para cerrar sesión
      Cookies.remove("token"); // Eliminar el token de autenticación almacenado localmente
      Cookies.remove("userRole"); // Eliminar cualquier otra información de sesión
      setIsAuthenticated(false); // Actualizar el estado de autenticación a falso
      setUser(null); // Limpiar la información del usuario
      setUserRole(null); // Limpiar el rol de usuario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setIsAuthenticated(true);
        setLoading(false);
      } catch (e) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function checkRole() {
      try {
        const encryptedRole = Cookies.get("userRole");

        if (!encryptedRole) {
          setUserRole(null);
          return;
        }

        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedRole,
          env.SECRET_KEY_ROLE,
        );
        const role = decryptedBytes.toString(CryptoJS.enc.Utf8);

        setUserRole(role);
      } catch (error) {
        setUserRole(null);
      }
    }

    checkRole();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        signup,
        signin,
        user,
        sendEmailPwd,
        confirmPwd,
        isAuthenticated,
        errors,
        loading,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};