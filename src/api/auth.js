import axios from "./axios";

export const logoutRequest = () => axios.post("/users/logout");
export const registerRequest = (user) => axios.post("/users/signup", user);
export const loginRequest = (user) => axios.post("/users/login", user);
export const verifyAccountRequest = () => axios.post("/users/verify-account");
export const verifiedAccountRequest = (token) =>
  axios.put(`/users/verified-account/${token}`);
export const forgotPassword = (email) =>
  axios.post("/users/forgot-password", email);
export const resetPassword = (uid, token, obj) =>
  axios.put(`/users/${uid}/reset-password/${token}`, obj);
