/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { userRole, logout, userId, userCart } = UseAuth();

  const [formData, setFormData] = useState(null);
  const [cartData, setCartData] = useState(null);

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

  useEffect(() => {
    // Obtener datos guardados del almacenamiento local al montar el componente
    const savedData = localStorage.getItem("cart");
    if (savedData) {
      setCartData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (userCart) {
      localStorage.setItem("cart", JSON.stringify(userCart));
      setCartData(userCart);
    }
  }, [userCart]);

  const handleCart = async () => {
    navigate(`/users/carts/${cartData}`);
  };

  const handleNotification = async () => {
    navigate(`/users/${formData}/carts/purchase-made`);
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
                <Link to="/admin/configure-users">cambios a premium</Link>
              </li>
            </div>

            <div className="w-auto flex justify-around items-center font-bold gap-x-14">
              <li className="capitalize">
                <Link to="/admin/all-users">usuarios</Link>
              </li>
            </div>

            <div
              onClick={handleLogout}
              className="flex gap-2 text-red-500 cursor-pointer hover:text-red-700 duration-300"
            >
              <span className="italic">logout</span>
              <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6" />
            </div>
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
            <div
              onClick={handleLogout}
              className="flex gap-2 text-red-500 cursor-pointer hover:text-red-700 duration-300"
            >
              <span className="italic">logout</span>
              <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6" />
            </div>
          </div>
        ) : userRole === "user" ? (
          <div className="w-auto flex justify-around items-center font-bold gap-x-14">
            <li className="capitalize">
              <Link to="/users/products">productos</Link>
            </li>
            <li className="capitalize">
              <Link to={`/users/${formData}/documents`}>premium</Link>
            </li>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="w-6 h-6 text-rose-500 cursor-pointer"
              onClick={handleCart}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-6 h-6 text-orange-500 cursor-pointer"
              onClick={handleNotification}
            />
            <div
              onClick={handleLogout}
              className="flex gap-2 text-red-500 cursor-pointer hover:text-red-700 duration-300"
            >
              <span className="italic">logout</span>
              <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6" />
            </div>
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
