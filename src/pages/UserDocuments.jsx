import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UserDocuments = () => {
  const { uid } = useParams();
  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm();

  const { infoDocuments } = UseAuth();

  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const names = Array.from(files).map((file) => ({
      name: file.name,
      field: e.target.name,
    }));

    setFileNames((prevFiles) => [...prevFiles, ...names]);
  };

  const onSubmit = handleSubmit(async (data) => {
    const confirmed = await showUpdateConfirmation();
    if (confirmed) {
      const formData = new FormData();

      if (data.dni && data.dni[0]) formData.append("dni", data.dni[0]);
      if (data.address && data.address[0])
        formData.append("address", data.address[0]);
      if (data.bank && data.bank[0]) formData.append("bank", data.bank[0]);

      // Verifica si alguno de los campos de archivo está vacío
      if (
        !formData.has("dni") ||
        !formData.has("address") ||
        !formData.has("bank")
      ) {
        Swal.fire({
          title: "Error!",
          text: "Falta adjuntar archivos en todos los campos de archivo",
          icon: "error",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Object.entries(data).forEach(([key, value]) => {
          if (!["dni", "address", "bank"].includes(key)) {
            formData.append(key, value);
          }
        });
        const sendData = Object.fromEntries(formData);

        await infoDocuments(uid, sendData);

        Swal.fire({
          title: "Datos enviados!",
          text: "Los archivos han sido enviados exitosamente.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    }
  });

  const showUpdateConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Haz completado todos los campos correctamente?",
      text: "El administrador revisará tus datos, si todo está correcto, en la próxima sesión ingresarás como USUARIO PREMIUM",
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
    <section className="sm:min-w-96 sm:max-w-2xl h-svh px-6 pt-28 mb-80">
      <h1 className="text-4xl text-center w-5/6 mt-20 mx-auto">
        Carga de documentos
      </h1>

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="bg-slate-100 w-5xl p-10 mt-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800 flex flex-col gap-y-5"
      >
        <div className="file is-info has-name">
          <label className="file-label">
            <input
              {...register("dni", { required: false })}
              onChange={handleFileChange}
              className="file-input"
              type="file"
              name="dni"
              max={1}
            />
            <span className="file-cta">
              <span className="file-icon m-0">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">DNI</span>
            </span>
            <span className="file-name p-0 pl-2 px-3 grid place-items-center">
              {fileNames.map(
                (item, i) =>
                  item.field === "dni" && <span key={i}>{item.name}</span>,
              )}
              {fileNames.every((item) => item.field !== "dni") && (
                <span className="file-name">No hay archivo seleccionado</span>
              )}
            </span>
          </label>
        </div>

        <div className="file is-info has-name">
          <label className="file-label">
            <input
              {...register("address", { required: false })}
              onChange={handleFileChange}
              className="file-input"
              type="file"
              name="address"
              max={1}
            />
            <span className="file-cta">
              <span className="file-icon m-0">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Domicilio</span>
            </span>
            <span className="file-name  p-0 pl-2 px-3 grid place-items-center">
              {fileNames.map(
                (item, i) =>
                  item.field === "address" && <span key={i}>{item.name}</span>,
              )}
              {fileNames.every((item) => item.field !== "address") && (
                <span className="file-name">No hay archivo seleccionado</span>
              )}
            </span>
          </label>
        </div>

        <div className="file is-info has-name">
          <label className="file-label">
            <input
              {...register("bank", { required: false })}
              onChange={handleFileChange}
              className="file-input"
              type="file"
              name="bank"
              max={1}
            />
            <span className="file-cta">
              <span className="file-icon m-0">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Comprob. de cuenta</span>
            </span>
            <span className="file-name  p-0 pl-2 px-3 grid place-items-center">
              {fileNames.map(
                (item, i) =>
                  item.field === "bank" && <span key={i}>{item.name}</span>,
              )}
              {fileNames.every((item) => item.field !== "bank") && (
                <span className="file-name">No hay archivo seleccionado</span>
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 p-4 rounded-md mt-10"
        >
          enviar
        </button>
      </form>
    </section>
  );
};

export default UserDocuments;
