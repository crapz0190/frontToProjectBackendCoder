/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  addImgsRequest,
  addProductsRequest,
  allProductsRequest,
  deleteImgsRequest,
  deleteProductRequest,
  productIdRequest,
  updateProductIdRequest,
} from "../api/products";

const ProductContext = createContext();

export const UseProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};

export function ProductProvider({ children }) {
  const [errors, setErrors] = useState([]);
  const [products, setProducts] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [errorDataProd, setErrorDataProd] = useState(null);

  const getProducts = async (page) => {
    try {
      const res = await allProductsRequest({ page });
      setProducts(res.data.payload);
      setNextPage(res.data.payload.nextPage);
      setPrevPage(res.data.payload.prevPage);
      setHasPrevPage(res.data.payload.hasPrevPage);
      setHasNextPage(res.data.payload.hasNextPage);
      setCurrentPage(res.data.payload.page);
      setTotalPages(res.data.payload.totalPages);
    } catch (error) {
      setErrors(error.response);
    }
  };

  const addProducts = async (obj) => {
    try {
      await addProductsRequest(obj);
    } catch (error) {
      setErrorDataProd(error);
    }
  };

  const deleteProductAndImages = async (pid) => {
    try {
      await deleteProductRequest(pid);
    } catch (error) {
      setErrorDataProd(error);
    }
  };

  const dataProductId = async (pid) => {
    try {
      const idProduct = await productIdRequest(pid);
      setDataUpdate(idProduct.data.payload);
    } catch (error) {
      setErrorDataProd(error);
    }
  };

  const upteProdId = async (pid, obj) => {
    try {
      await updateProductIdRequest(pid, obj);
    } catch (error) {
      setErrorDataProd(error);
    }
  };

  const removeImage = async (pid, imgUrl) => {
    try {
      await deleteImgsRequest(pid, imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const addImagesToProd = async (pid, images) => {
    try {
      await addImgsRequest(pid, images);
    } catch (error) {
      setErrorDataProd(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        errors,
        products,
        getProducts,
        nextPage,
        prevPage,
        hasNextPage,
        hasPrevPage,
        currentPage,
        totalPages,
        addProducts,
        deleteProductAndImages,
        dataProductId,
        dataUpdate,
        upteProdId,
        errorDataProd,
        removeImage,
        addImagesToProd,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
