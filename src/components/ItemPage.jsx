/* eslint-disable react/prop-types */
const ItemPage = ({ product }) => {
  const firstThumbnail =
    product.thumbnails.length > 0 ? product.thumbnails[0] : null;

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
        <h3 className="productTitle">{product.title}</h3>
      </div>
      <div className="flex justify-around items-center text-purple-600 mt-2">
        <h2 className="text-orange-600 font-bold">${product.price}</h2>
        <span>Envío gratis</span>
      </div>
    </div>
  );
};

export default ItemPage;
