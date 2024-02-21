/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    signup,
    errors: registerErrors,
    isAuthenticated,
    userRole,
  } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "user") {
        navigate("/users/products");
      } else if (userRole === "admin") {
        navigate("/admin/products");
      } else if (userRole === "premium") {
        navigate("/premium/products");
      }
    }
  }, [isAuthenticated, userRole]);

  const renderError = (error) => {
    // Manejar el caso del objeto de error
    if (typeof error === "object" && error !== null && !Array.isArray(error)) {
      return (
        <div className="bg-red-500 max-w-sm p-2 my-2 rounded-md text-white">
          {error.name}
        </div>
      );
    }
    // Manejar el caso del array de error
    else if (typeof error === "string") {
      return (
        <div className="bg-red-500 max-w-sm p-2 my-2 rounded-md text-white">
          {error}
        </div>
      );
    }
    // Si el error no es ni un objeto ni un string, devolver null
    else {
      return null;
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!isValidEmail(values.email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un email válido",
        icon: "error",
      });
      return;
    }

    if (!isValidPassword(values.password)) {
      Swal.fire({
        title: "Error",
        text: "La contraseña debe tener al menos 8 carácteres",
        icon: "error",
      });
      return;
    }

    await signup(values);
    reset();
  });

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (pwd) => {
    // Expresión regular para validar el formato del email
    const passVerify = pwd.length >= 8;
    return passVerify;
  };

  return (
    <div
      className="flex h-[calc(100vh-100px)] items-center justify-center w-11/12 mb-20"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundImage: `url(https://res.cloudinary.com/dvyyree1e/image/upload/v1707924058/register_is6k94.webp)`,
      }}
    >
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800">
        <h1 className="mb-5 font-bold uppercase text-2xl">
          Create your account
        </h1>
        {Object.values(registerErrors).map((error, i) => (
          <div
            key={i}
            className="bg-red-500 max-w-sm px-2 my-2 rounded-md text-white"
          >
            {renderError(error)}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("first_name", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="first name"
          />
          {errors.first_name && (
            <p className="text-red-500">First name is required</p>
          )}
          <input
            type="text"
            {...register("last_name", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="last name"
          />
          {errors.last_name && (
            <p className="text-red-500">Last name is required</p>
          )}
          <input
            type="number"
            {...register("age", { required: false })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="age (this field is optional)"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to={"/users/login"} className="font-bold ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
