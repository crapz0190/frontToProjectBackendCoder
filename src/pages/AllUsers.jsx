/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const AllUsers = () => {
  const { allUsersReq, allUser, removeUser, inactiveUser } = UseAuth();
  // console.log(allUser);

  useEffect(() => {
    allUsersReq();
  }, []);

  if (!allUser) {
    return <div>Loading...</div>;
  }

  const handleDataClick = async (data) => {
    const confirmed = await showDeleteConfirmation();
    if (confirmed) {
      await removeUser(data.id, data.cart);
      Swal.fire({
        title: "Eliminado!",
        text: "Un usuario ha sido eliminado.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const showDeleteConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este usuario?",
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

  const handleInactiveUser = async () => {
    await inactiveUser();
    window.location.reload();
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-y-16 w-11/12 mb-20">
      <section className="grid place-items-center gap-y-3">
        <h1 className="uppercase font-bold text-2xl">Lista de usuarios</h1>
        <button
          type="submit"
          onClick={handleInactiveUser}
          className="flex justify-center items-center gap-x-2 text-red-800 hover:underline hover:text-rose-600"
        >
          <FontAwesomeIcon icon={faCircleUser} className="w-5 h-5" />
          <span>actualizar lista</span>
        </button>
      </section>

      <ul className="rounded-md p-2 m-2 flex flex-wrap gap-x-10 text-slate-800">
        {allUser.data.payload
          .filter((user) => user.role !== "admin")
          .map((user, i) => (
            <li
              key={i}
              className="bg-slate-50 p-5 mt-5 rounded-lg shadow-md w-96 mx-auto flex flex-col gap-y-5"
            >
              <p>id usuario: {user.id}</p>
              <p className="flex justify-between items-center">
                Role: {user.role}
              </p>
              <p>Nombre: {user.name}</p>
              <p>Apellido: {user.surname}</p>
              <p>Email: {user.email}</p>

              {user.id && (
                <ul>
                  {user.documents.map((document, index) => (
                    <li key={index}>{document.reference}</li>
                  ))}
                </ul>
              )}

              <button
                type="submit"
                onClick={() => handleDataClick(user)}
                className="grid place-self-center place-items-center text-white w-40 capitalize px-5 h-10 rounded-md duration-300 bg-rose-600 hover:bg-rose-500"
              >
                eliminar
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllUsers;
