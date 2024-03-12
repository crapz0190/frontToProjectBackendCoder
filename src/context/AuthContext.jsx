/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import {
  loginRequest,
  registerRequest,
  verifyAccountRequest,
  forgotPassword,
  resetPassword,
  logoutRequest,
  saveDocuments,
  allUsersRequest,
  userChangeRole,
  removeUserAndCart,
  inactiveUserRemover,
  userById,
  allPurchases,
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
  const [allUser, setAllUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [userPurchase, setUserPurchase] = useState(null);

  // ---------- USERS ---------

  const allPurchasesUser = async (uid) => {
    try {
      const purchase = await allPurchases(uid);
      console.log(purchase);
      setUserPurchase(purchase);
    } catch (error) {
      setErrors(error);
    }
  };

  const userByIdFound = async (uid) => {
    try {
      const userFound = await userById(uid);
      setUserId(userFound);
    } catch (error) {
      setErrors(error);
    }
  };

  const inactiveUser = async () => {
    try {
      await inactiveUserRemover();
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (uid, cid) => {
    try {
      await removeUserAndCart(uid, cid);
    } catch (error) {
      console.log(error);
    }
  };

  const changeRole = async (uid) => {
    try {
      await userChangeRole(uid);
    } catch (error) {
      console.log(error);
    }
  };

  const allUsersReq = async () => {
    try {
      const usersReq = await allUsersRequest();
      setAllUser(usersReq);
    } catch (error) {
      console.log(error);
    }
  };

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
      setUserId(login.data.payload._id);
      setUserCart(login.data.payload.cart);

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

  const infoDocuments = async (pid, obj) => {
    try {
      await saveDocuments(pid, obj);
    } catch (error) {
      console.log(error);
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
        infoDocuments,
        userId,
        allUsersReq,
        allUser,
        changeRole,
        removeUser,
        inactiveUser,
        userByIdFound,
        userCart,
        allPurchasesUser,
        userPurchase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
