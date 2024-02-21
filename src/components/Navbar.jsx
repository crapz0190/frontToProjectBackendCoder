/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userRole, logout, userId } = UseAuth();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Obtener datos guardados del almacenamiento local al montar el componente
    const savedData = localStorage.getItem("uid");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Actualizar los datos guardados cuando dataUpdate cambia
  useEffect(() => {
    if (userId) {
      localStorage.setItem("uid", JSON.stringify(userId));
      setFormData(userId);
    }
  }, [userId]);

  const handleLogout = () => {
    logout();
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    navigate(selectedOption);
  };

  return (
    <nav className="text-slate-900 bg-slate-100 border-b-2 py-5 px-10 fixed top-0 right-0 left-0 z-20">
      <ul className="flex justify-between items-center py-2">
        <div className="pl-20">
          <li>LOGO</li>
        </div>
        {userRole === "admin" ? (
          <div className="w-auto flex justify-around items-center font-bold gap-x-14">
            <div className="select">
              <select
                className="is-hovered w-60 px-4"
                onChange={handleOptionChange}
              >
                <option value="/admin/products">lista productos</option>
                <option value="/admin/products">productos</option>
                <option value="/admin/products/add-products">
                  carga de productos
                </option>
                <option value="/admin/products/update-products">
                  configuración de productos
                </option>
              </select>
            </div>

            <div className="w-auto flex justify-around items-center font-bold gap-x-14">
              <li className="capitalize">
                <Link to="/admin/configure-users">usuarios</Link>
              </li>
            </div>

            <button
              className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-rose-600"
              onClick={handleLogout}
            >
              log out
            </button>
          </div>
        ) : userRole === "premium" ? (
          <div className="w-auto flex justify-around items-center font-bold gap-x-14">
            <div className="select">
              <select
                className="is-hovered w-60 px-4"
                onChange={handleOptionChange}
              >
                <option value="/premium/products">lista productos</option>
                <option value="/premium/products">productos</option>
                <option value="/premium/products/add-products">
                  carga de productos
                </option>
                <option value="/premium/products/update-products">
                  configuración de productos
                </option>
              </select>
            </div>
            <button
              className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-rose-600"
              onClick={handleLogout}
            >
              log out
            </button>
          </div>
        ) : userRole === "user" ? (
          <div className="w-auto flex justify-around items-center font-bold gap-x-14">
            <li className="capitalize">
              <Link to="/users/products">productos</Link>
            </li>
            <li className="capitalize">
              <Link to={`/users/${formData}/documents`}>premium</Link>
            </li>
            <button
              className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-rose-600"
              onClick={handleLogout}
            >
              log out
            </button>
          </div>
        ) : (
          <div className="w-auto flex justify-around items-center font-bold gap-x-14">
            <li className="capitalize">
              <Link to="/users/login">login</Link>
            </li>
            <li className="text-slate-100  uppercase">
              <Link
                className="bg-red-500 rounded-md px-5 py-3"
                to="/users/signup"
              >
                signup
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

{
  /* <div className="w-auto flex justify-around items-center font-bold gap-x-14">
<li className="capitalize">
  <Link to="/admin/products">products</Link>
</li>
<li className="capitalize">
  <Link to="/admin/products/add-products">add products</Link>
</li>
<li className="capitalize">
  <Link to="/admin/products/update-products">setting products</Link>
</li>
<button
  className="text-white text-center w-32 capitalize px-5 h-10 rounded-md duration-300 bg-red-600 hover:bg-rose-600"
  onClick={handleLogout}
>
  log out
</button>
</div> */
}
