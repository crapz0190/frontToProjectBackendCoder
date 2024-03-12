/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { UseProducts } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UseAuth } from "../context/AuthContext";

const SettingProducts = () => {
  const { pid } = useParams();
  const { dataUpdate, deleteProductAndImages, dataProductId } = UseProducts();
  const [formData, setFormData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const { userRole } = UseAuth();

  useEffect(() => {
    // Obtener datos guardados del almacenamiento local al montar el componente
    const savedData = localStorage.getItem("info_prod");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Actualizar los datos guardados cuando dataUpdate cambia
  useEffect(() => {
    if (dataUpdate) {
      localStorage.setItem("info_prod", JSON.stringify(dataUpdate));
      setFormData(dataUpdate);
    }
  }, [dataUpdate]);

  const navigate = useNavigate();

  const { handleSubmit } = useForm();

  const thumbnails = formData ? formData.thumbnails : "";
  const dataProduct = formData ? formData : "";

  const firstThumbnail =
    thumbnails.length > 0 ? dataProduct.thumbnails[0] : null;

  const onSubmit = handleSubmit(async () => {
    const confirmed = await showDeleteConfirmation();
    if (confirmed) {
      await deleteProductAndImages(formData._id);
      Swal.fire({
        title: "Eliminado!",
        text: "Un producto ha sido eliminado.",
        icon: "success",
      }).then(() => {
        if (userRole === "admin") {
          navigate("/admin/products/update-products");
        } else if (userRole === "premium") {
          navigate("/premium/products/update-products");
        }
      });
    }
  });

  const onSubmit2 = async () => {
    const confirmed = await showUpdateConfirmation();
    if (confirmed) {
      dataProductId(formData._id);
      if (userRole === "admin") {
        navigate(`/admin/products/update-data-product-by-id/${formData._id}`);
      } else if (userRole === "premium") {
        navigate(`/premium/products/update-data-product-by-id/${formData._id}`);
      }
    }
  };

  const onSubmit3 = async () => {
    if (userRole === "admin") {
      navigate(`/admin/products/configure-images/${pid}`);
    } else if (userRole === "premium") {
      navigate(`/premium/products/configure-images/${pid}`);
    }
  };

  const showDeleteConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    return result.isConfirmed;
  };

  const showUpdateConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Desea actualizar este producto?",
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

  const handleThumbnailClick = (thumbnail) => {
    setMainImage(thumbnail);
  };

  return (
    <section className="flex justify-center items-center h-screen mt-24 w-5/12">
      <section className="bg-slate-50 flex justify-center items-center flex-col p-10 rounded-lg shadow-xl">
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

        <div className="text-center">
          <h3 className="pt-10">{dataProduct.title}</h3>
        </div>

        <section className="flex justify-center gap-10 mt-20">
          <button
            onClick={onSubmit}
            className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-red-500"
          >
            eliminar
          </button>
          <button
            onClick={onSubmit2}
            className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-sky-600 hover:bg-sky-500"
          >
            actulizar
          </button>
          <button
            onClick={onSubmit3}
            className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-orange-600 hover:bg-orange-500"
          >
            imágenes
          </button>
        </section>
      </section>
    </section>
  );
};

export default SettingProducts;
