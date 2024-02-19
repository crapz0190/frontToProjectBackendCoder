import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const RecoverPwdToken = () => {
  const { uid, token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { confirmPwd, errors: pwdErrors } = UseAuth();

  const onSubmit = handleSubmit((data) => {
    confirmPwd(uid, token, data);
  });

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
      className="flex h-[calc(100vh-100px)] items-center justify-center"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundImage: `url(https://res.cloudinary.com/dvyyree1e/image/upload/v1707924846/reset-pwd_fg1foj.webp)`,
      }}
    >
      <div className=" bg-slate-100 max-w-md w-full p-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800">
        <h1 className="mb-5 font-bold uppercase text-2xl">Reset Password</h1>
        {Object.values(pwdErrors).map((error, i) => (
          <div
            key={i}
            className="bg-red-500 max-w-sm px-2 my-2 rounded-md text-white"
          >
            {renderError(error)}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="password"
            name="newPassword"
            {...register("newPassword", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="new password"
          />
          {errors.newPassword && (
            <p className="text-red-500">New password is required</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
            className="w-full placeholder-zinc-500 bg-white text-slate-900 focus:outline-none px-4 py-2 rounded-md my-2 border border-slate-300"
            placeholder="confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Confirm password is required</p>
          )}

          <button
            type="submit"
            className="w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 px-4 py-2 rounded-md my-2"
          >
            reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPwdToken;
