import axios from "./axios";

export const addProducToCart = (cid, pid, obj) =>
  axios.put(`/carts/${cid}/product/${pid}`, obj);

export const getCartById = (cid) => axios.get(`/carts/${cid}`);

export const removeCartById = (cid, pid) =>
  axios.delete(`/carts/${cid}/product/${pid}`);

export const finalizePurchase = (cid) => axios.post(`/carts/${cid}/purchase`);
