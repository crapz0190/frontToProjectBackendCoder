/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated, userRole } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "user") {
        navigate("/users/products");
      } else if (userRole === "admin") {
        navigate("/admin/products");
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

  return (
    <div
      className="h-[calc(100vh-100px)] flex items-center justify-center w-11/12 mb-20"
      style={{
        background: `url(https://res.cloudinary.com/dvyyree1e/image/upload/v1707919058/ilustracion-ecommerce_iu4anc.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800">
        <h1 className="mb-5 font-bold uppercase text-2xl">
          Log in to your account
        </h1>
        {Object.values(signinErrors).map((error, i) => (
          <div
            key={i}
            className="bg-red-500 max-w-sm px-2 my-2 rounded-md text-white"
          >
            {renderError(error)}
          </div>
        ))}
        <form onSubmit={onSubmit}>
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
            className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 px-4 py-2 rounded-md my-5"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link to="/users/signup" className="font-bold ">
            Sign up
          </Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/users/recover-password" className="font-bold ">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
