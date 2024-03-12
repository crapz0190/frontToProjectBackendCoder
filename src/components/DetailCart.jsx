/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseCarts } from "../context/CartsContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const DetailCart = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { cartById, cartData, deleteCartById, purchase } = UseCarts();

  useEffect(() => {
    const cartInfo = async () => {
      try {
        await cartById(cid);
      } catch (error) {
        console.log(error);
      }
    };
    cartInfo();
  }, [cid]);

  const infoCartUser = cartData ? cartData.data.payload.products : null;
  const idUserToPurchase = cartData ? cartData.data.payload.user : null;

  const removeProdFromCart = async (idProduct) => {
    await deleteCartById(cid, idProduct);
    window.location.reload();
  };

  const finalizePurchase = async () => {
    const confirmed = await showPurchaseConfirmation();
    if (confirmed) {
      await purchase(cid);
      Swal.fire({
        title: "Haz realizado una compra",
        text: "Compra realizada con éxito",
        icon: "success",
      }).then(() => {
        navigate(`/users/${idUserToPurchase}/carts/purchase-made`);
      });
    }
  };

  const showPurchaseConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Finalizar compra?",
      text: "Esta acción te redireccionará a otra página",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });
    return result.isConfirmed;
  };

  return (
    <div className="h-screen mt-24 w-auto px-5">
      <h1 className="uppercase font-semibold text-center mt-10">
        productos agregados al carrito
      </h1>
      {infoCartUser ? (
        infoCartUser.map((product, index) => (
          <div
            key={index}
            className="border border-slate-400 mt-5 px-5 py-2 flex justify-between items-center gap-x-16  p-10 rounded-lg shadow-xl"
          >
            {product.product.thumbnails &&
              product.product.thumbnails.length > 0 && (
                <img
                  src={product.product.thumbnails[0]}
                  alt={product.product.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
              )}
            <div>
              <h2>{product.product.title}</h2>
              <p>Price: {product.product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <FontAwesomeIcon
              onClick={() => removeProdFromCart(product.product._id)}
              icon={faTrashCan}
              className="w-5 h-5 text-red-600 cursor-pointer"
            />
          </div>
        ))
      ) : (
        <p>Loading cart...</p>
      )}

      {infoCartUser && infoCartUser.length === 0 ? (
        <p className="text-center mt-5">No hay productos en el carrito</p>
      ) : (
        <button
          onClick={finalizePurchase}
          className="inline-block text-white text-center font-semibold uppercase w-full h-14 border-2 rounded-md p-2 pt-3 mt-5 duration-300 bg-rose-600 hover:bg-rose-700"
        >
          finalizar compra
        </button>
      )}
    </div>
  );
};

export default DetailCart;
