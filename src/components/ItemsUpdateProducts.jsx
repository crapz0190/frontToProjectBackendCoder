/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { UseProducts } from "../context/ProductsContext";

const ItemsUpdateProducts = ({ product }) => {
  const navigate = useNavigate();

  const { dataProductId } = UseProducts();

  const firstThumbnail =
    product.thumbnails.length > 0 ? product.thumbnails[0] : null;

  const onSubmit = async () => {
    await dataProductId(product._id);
    navigate(`/admin/products/configure-product/${product._id}`);
  };

  return (
    <div className="rounded-md p-2 m-2 flex flex-col justify-center text-slate-800">
      <figure className="w-full">
        {firstThumbnail && (
          <img
            className="w-full h-72 object-contain"
            alt={product.title}
            src={firstThumbnail}
          />
        )}
      </figure>
      <div className="text-center">
        <h3 className="_id">{product._id}</h3>
        <h3 className="productTitle">{product.title}</h3>
      </div>
      <section className="flex justify-between">
        <button
          onClick={onSubmit}
          className="text-white text-center w-full capitalize px-5 h-10 rounded-md duration-300 bg-sky-600 hover:bg-sky-300"
        >
          configuración
        </button>
      </section>
    </div>
  );
};

export default ItemsUpdateProducts;
