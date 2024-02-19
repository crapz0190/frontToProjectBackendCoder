import axios from "./axios";

export const allProductsRequest = (params) =>
  axios.get("/products", { params });

export const productIdRequest = (pid) => axios.get(`/products/${pid}`);

export const updateProductIdRequest = (pid, obj) =>
  axios.put(`/products/${pid}`, obj);

export const addProductsRequest = (obj) =>
  axios.post("/products/add", obj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteImgsRequest = (pid, imageUrl) =>
  axios.delete(`/products/${pid}/delete-image`, {
    data: { imageUrl: imageUrl },
  });

export const addImgsRequest = (pid, images) =>
  axios.put(`/products/${pid}/add-images`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProductRequest = (pid) => axios.delete(`/products/${pid}`);
