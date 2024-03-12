import axios from "./axios";

export const allUsersRequest = () => axios.get("/users");
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
export const saveDocuments = (uid, obj) =>
  axios.post(`/users/${uid}/documents`, obj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const removeUserAndCart = (uid, cid) =>
  axios.delete(`/users/${uid}/delete-cart/${cid}`);

export const userChangeRole = (uid) => axios.put(`users/premium/${uid}`);
export const inactiveUserRemover = () => axios.delete("/users/inactive-user");
export const userById = (uid) => axios.get(`/users/${uid}`);
export const allPurchases = (uid) =>
  axios.get(`/users/${uid}/finalize-purchase`);
