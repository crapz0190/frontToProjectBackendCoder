/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UseProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ConfigureImages = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm();

  const { pid } = useParams();
  const { dataProductId, dataUpdate, removeImage, addImagesToProd } =
    UseProducts();
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    async function idProdGetImgs() {
      await dataProductId(pid);
    }
    idProdGetImgs();
  }, []);

  const thumbnailsProdId = dataUpdate ? dataUpdate.thumbnails : null;

  // ----------- ELIMINAR IMAGENES ------------
  const handleThumbnailClick = async (thumbnail) => {
    const confirmed = await showDeleteConfirmation();
    if (confirmed) {
      await removeImage(pid, thumbnail);
      Swal.fire({
        title: "Eliminado!",
        text: "Una imágen ha sido eliminada.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    }
  };

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

  // --------------- SUBIR IMAGENES --------------
  const onSubmit = handleSubmit(async (data) => {
    const confirmed = await showUpdateConfirmation();
    if (confirmed) {
      const formData = new FormData();
      for (let i = 0; i < data.thumbnails.length; i++) {
        formData.append(`thumbnails${[i]}`, data.thumbnails[i]);
      }
      const sendData = Object.fromEntries(formData);

      await addImagesToProd(pid, sendData);

      Swal.fire({
        title: "Imágen/es agregada/as!",
        text: "Se ha actualizado las imágenes de tú producto, exitosamente.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    }
  });

  const showDeleteConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta imágen?",
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
      title:
        "Estás a punto de subir una imágen o varias imágenes, ¿Deseas continuar?",
      text: "Esta acción actualizará las imágenes de tú producto",
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
    <div className="flex flex-wrap flex-col justify-start items-center mt-24 h-screen w-11/12">
      {dataUpdate && thumbnailsProdId.length > 0 && (
        <div className="flex gap-x-9">
          {thumbnailsProdId.map((thumbnail, index) => (
            <div key={index} className="p-5 relative">
              <img
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="w-72 h-72 object-contain"
              />
              <FontAwesomeIcon
                onClick={() => handleThumbnailClick(thumbnail)}
                className="absolute top-10 right-0 text-red-500 w-5 h-8 cursor-pointer"
                icon={faTrashCan}
              />
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="absolute bottom-10 right-20 flex justify-center items-center flex-col gap-y-2 bg-slate-100 mx-auto max-w-3xl p-3 mt-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800"
      >
        <div className="file is-danger has-background-danger-light has-name is-boxed">
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
          className="text-white text-center w-40 capitalize px-5 h-10 rounded-md duration-300 bg-rose-600 hover:bg-rose-500"
        >
          enviar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ConfigureImages;
