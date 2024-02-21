import { useForm } from "react-hook-form";
import { UseProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UseAuth } from "../context/AuthContext";

const UpdateDataProducId = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const { userRole } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dataUpdate, upteProdId } = UseProducts();
  const [formData, setFormData] = useState(null);

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

  const onSubmit = handleSubmit(async (data) => {
    const confirmed = await showUpdateConfirmation();
    if (confirmed) {
      await upteProdId(pid, data);

      Swal.fire({
        title: "Actualizado!",
        text: "Un producto ha sido actualizado.",
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

  const showUpdateConfirmation = async () => {
    const result = await Swal.fire({
      title:
        "¿Estás seguro de que deseas continuar con la actualización de este producto?",
      text: "Esta acción actualizará el producto y te redireccionará a la página de configuración de productos",
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
    <section className="w-full h-svh px-6 pt-28 mb-80 ">
      <h1 className="text-4xl text-center w-2/6 mt-20 mx-auto">
        Actualización datos del producto
      </h1>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="bg-slate-100 mx-auto max-w-5xl w-4/6 p-10 mt-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800"
      >
        <div className="w-full flex flex-col items-center p-5 gap-2">
          <input
            {...register("title", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="title"
            value={formData ? formData.title : ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && (
            <p className="text-red-500">
              Title is required - modify or just click on the field
            </p>
          )}
          <textarea
            {...register("description", { required: true })}
            className="placeholder-zinc-500 textarea is-medium focus:border-rose-500"
            type="text"
            name="description"
            value={formData ? formData.description : ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="text-red-500">
              Description is required - modify or just click on the field
            </p>
          )}
          <input
            {...register("code", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="code"
            value={formData ? formData.code : ""}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
          {errors.code && (
            <p className="text-red-500">
              Code is required - modify or just click on the field
            </p>
          )}
          <input
            {...register("price", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="number"
            name="price"
            value={formData ? formData.price : ""}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          {errors.price && (
            <p className="text-red-500">
              Price is required - modify or just click on the field
            </p>
          )}
          <input
            {...register("stock", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="number"
            name="stock"
            value={formData ? formData.stock : ""}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
          {errors.stock && (
            <p className="text-red-500">
              Stock is required - modify or just click on the field
            </p>
          )}
          <input
            {...register("category", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="category"
            value={formData ? formData.category : ""}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          {errors.category && (
            <p className="text-red-500">
              Category is required - modify or just click on the field
            </p>
          )}

          <button
            type="submit"
            className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 p-4 rounded-md mt-10"
          >
            cargar productos
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateDataProducId;
