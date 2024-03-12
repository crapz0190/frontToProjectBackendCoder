/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { UseProducts } from "../context/ProductsContext";
import { UseAuth } from "../context/AuthContext";
import { UseCarts } from "../context/CartsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const DetailProduct = () => {
  const { pid } = useParams();
  const { dataUpdate, dataProductId } = UseProducts();
  const { userCart } = UseAuth();
  const [mainImage, setMainImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const { addProdToCart } = UseCarts();

  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    dataProductId(pid);
  }, []);

  const thumbnails = dataUpdate ? dataUpdate.thumbnails : [];
  const dataProduct = dataUpdate ? dataUpdate : "";

  const firstThumbnail =
    thumbnails.length > 0 ? dataUpdate.thumbnails[0] : null;

  const handleThumbnailClick = (thumbnail) => {
    setMainImage(thumbnail);
  };

  useEffect(() => {
    // Obtener datos guardados del almacenamiento local al montar el componente
    const savedData = localStorage.getItem("cart");
    if (savedData) {
      setCartData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (userCart) {
      localStorage.setItem("cart", JSON.stringify(userCart));
      setCartData(userCart);
    }
  }, [userCart]);

  const onSubmit = handleSubmit(async (data) => {
    const quantity = data;
    await addProdToCart(cartData, pid, quantity);

    toast.info("Se ha agregado productos al carrito!", {
      position: "top-left",
    });
  });

  return (
    <section className="flex justify-center items-center flex-wrap h-screen mt-24 w-auto px-5 gap-x-2">
      <section className="bg-slate-50 flex justify-center items-center p-10 rounded-lg shadow-xl">
        <div className="flex justify-between items-start p-5 gap-x-5">
          {thumbnails && thumbnails.length > 0 && (
            <div className="flex flex-col gap-y-2">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 cursor-pointer"
                  onClick={() => handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>
          )}

          <figure className="p-2 w-96 h-96">
            {mainImage ? (
              <img
                className="h-full object-contain"
                alt={dataProduct.title}
                src={mainImage}
              />
            ) : (
              <img
                className="h-full object-contain"
                alt={dataProduct.title}
                src={firstThumbnail}
              />
            )}
          </figure>
        </div>

        <section className="bg-slate-50 flex justify-center items-center flex-col p-10 rounded-lg shadow-xl">
          <div className="text-center">
            <h3 className="pt-10 font-semibold">{dataProduct.title}</h3>
            <p className="py-5">$ {dataProduct.price}</p>
            <form
              onSubmit={onSubmit}
              className="flex flex-wrap flex-col justify-center gap-10"
            >
              <div className="flex justify-center items-center gap-5">
                <input
                  {...register("quantity", { required: true })}
                  className="text-center w-4/12 h-14 border-2 rounded-md p-2 duration-300 bg-slate-100 font-bold"
                  type="number"
                  name="quantity"
                  min="1"
                  defaultValue={1}
                />
                <span>&#40;{dataProduct.stock} disponibles&#41;</span>
              </div>
              <button
                type="submit"
                className="grid place-self-center place-content-center text-white w-56 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-red-500"
              >
                agregar al carrito
              </button>
              <ToastContainer />
            </form>
          </div>
        </section>
      </section>

      <section className="bg-slate-50 flex justify-center flex-col p-10 rounded-lg shadow-xl">
        <h3 className="uppercase font-bold">description</h3>
        <p className="mt-8">{dataProduct.description}</p>
      </section>
    </section>
  );
};

export default DetailProduct;
