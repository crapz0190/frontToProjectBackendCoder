/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UseAuth } from "../context/AuthContext";

const ConfigureUsers = () => {
  const { allUsersReq, allUser, changeRole } = UseAuth();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    allUsersReq();
  }, []);

  const handleViewDocuments = (userId) => {
    setSelectedUserId(userId);
  };

  if (!allUser) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (uid) => {
    // Deshabilitar el botón
    setButtonDisabled(true);
    // enviar petición cambio de role
    changeRole(uid);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center w-11/12 mb-20 pt-40">
      <h1>Lista de usuarios</h1>
      <ul className="rounded-md p-2 m-2 flex flex-wrap gap-x-10 text-slate-800">
        {allUser.data.payload
          .filter((user) => user.role === "user")
          .map((user, i) => (
            <li
              key={i}
              className="bg-slate-50 p-5 mt-5 rounded-lg shadow-md w-96 mx-auto flex flex-col gap-y-5"
            >
              <p>id usuario: {user.id}</p>
              <p className="flex justify-between items-center">
                Role: {user.role}
                <span>
                  {user.documents.length > 0 ? (
                    <button
                      onClick={() => {
                        handleSubmit(user.id);
                      }}
                      className={`text-white text-center capitalize rounded-md ease-in duration-300 ${
                        buttonDisabled
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-500 cursor-pointer"
                      } w-32 h-9`}
                      disabled={buttonDisabled}
                    >
                      {buttonDisabled ? "Cambiado" : "Cambiar Role"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white text-center capitalize rounded-md ease-in duration-300 bg-red-600 hover:bg-red-500 cursor-pointer w-32 h-9"
                    >
                      deshabilitado
                    </button>
                  )}
                </span>
              </p>
              <p>Nombre: {user.name}</p>
              <p>Apellido: {user.surname}</p>
              <p>Email: {user.email}</p>
              <p className="flex justify-between items-center">
                Documentos:
                {user.documents.length > 0 ? (
                  selectedUserId === user.id ? (
                    <button
                      className="text-white text-center w-44 capitalize h-10 rounded-md ease-in duration-300 bg-red-600 hover:bg-red-500 cursor-pointer"
                      onClick={() => setSelectedUserId(null)}
                    >
                      Ocultar documentos
                    </button>
                  ) : (
                    <button
                      className="text-white text-center capitalize rounded-md ease-in duration-300 bg-green-600 hover:bg-green-500 cursor-pointer animate-bounce w-44 h-10"
                      onClick={() => handleViewDocuments(user.id)}
                    >
                      Ver documentos
                    </button>
                  )
                ) : (
                  <span className="text-white grid place-items-center text-center w-44 capitalize h-10 rounded-md duration-300 bg-red-600 hover:bg-red-500 cursor-pointer">
                    Sin documentos
                  </span>
                )}
              </p>
              {selectedUserId === user.id && (
                <ul>
                  {user.documents.map((document, index) => (
                    <li key={index}>{document.reference}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ConfigureUsers;
