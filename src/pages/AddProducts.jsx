import { useForm } from "react-hook-form";
import { UseProducts } from "../context/ProductsContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addProducts } = UseProducts();

  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 10) {
      toast.error("Solo puedes seleccionar hasta 10 archivos!", {
        position: "top-left",
      });

      e.target.value = null; // Limpia la selección de archivos
    } else {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const confirmed = await showUpdateConfirmation();
    if (confirmed) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("code", data.code);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      for (let i = 0; i < data.thumbnails.length; i++) {
        formData.append(`thumbnails${[i]}`, data.thumbnails[i]);
      }
      const sendData = Object.fromEntries(formData);

      await addProducts(sendData);

      Swal.fire({
        title: "Producto agregado!",
        text: "Un producto ha sido agregado exitosamente.",
        icon: "success",
      }).then(() => {
        reset();
      });
    }
  });

  const showUpdateConfirmation = async () => {
    const result = await Swal.fire({
      title:
        "¿Estás seguro de que deseas continuar con el agregado de este producto?",
      text: "Esta acción agregará un producto a tu lista de productos",
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
        Carga de producto
      </h1>

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="bg-slate-100 mx-auto max-w-3xl w-4/6 p-10 mt-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800"
      >
        <div className="w-full flex flex-col items-center p-5 gap-2">
          <input
            {...register("title", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="title"
            placeholder="Título"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <textarea
            {...register("description", { required: true })}
            className="placeholder-zinc-500 textarea is-medium focus:border-rose-500"
            type="text"
            name="description"
            placeholder="Descripción"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
          <input
            {...register("code", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="code"
            placeholder="Código"
          />
          {errors.code && <p className="text-red-500">Code is required</p>}
          <input
            {...register("price", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="number"
            name="price"
            placeholder="Precio"
          />
          {errors.price && <p className="text-red-500">Price is required</p>}
          <input
            {...register("stock", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="number"
            name="stock"
            placeholder="Cantidad"
          />
          {errors.stock && <p className="text-red-500">Stock is required</p>}
          <input
            {...register("category", { required: true })}
            className="placeholder-zinc-500 input is-medium focus:border-rose-500"
            type="text"
            name="category"
            placeholder="Categoría"
          />
          {errors.category && (
            <p className="text-red-500">Category is required</p>
          )}

          <div className="file is-danger has-background-danger-light has-name is-boxed mt-5">
            <label className="file-label">
              <input
                {...register("thumbnails", { required: false })}
                onChange={handleFileChange}
                className="file-input w-2/3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                type="file"
                name="thumbnails"
                multiple
                accept="image/*"
                max={10}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
                <span className="file-label">Subir imágenes…</span>
                <span className="text-sm">&#40;máx 10 img&#41;</span>
              </span>
              <span className="file-names">
                {fileNames.map((name, index) => (
                  <span key={index} className="file-name inline-block mt-1">
                    {name}
                  </span>
                ))}
                {fileNames.length === 0 && (
                  <span className="file-name">No hay imágenes subidas</span>
                )}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 p-4 rounded-md mt-10"
          >
            cargar productos
          </button>
          <ToastContainer />
        </div>
      </form>
    </section>
  );
};

export default AddProducts;
