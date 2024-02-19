import { env } from "../utils/config";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendEmailPwd, errors: recPassErrors } = UseAuth();
  // const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [reload, setReload] = useState(false);

  if (reload) {
    window.location.reload();
  }

  function handleRecaptchaChange(value) {
    // Verifica si el valor de recaptcha no es nulo
    if (value !== null) {
      setIsButtonDisabled(false); // Habilita el botón
    } else {
      setIsButtonDisabled(true); // Deshabilita el botón
    }
  }

  const onSubmit = handleSubmit((data) => {
    if (!isButtonDisabled) {
      sendEmailPwd(data);
    } else {
      setReload(true);
    }
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
      className="flex h-[calc(100vh-100px)] items-center justify-center w-11/12 mb-20"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundImage: `url(https://res.cloudinary.com/dvyyree1e/image/upload/v1707924538/recover-pwd_qrsd8g.jpg)`,
      }}
    >
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md border border-stone-300 shadow-lg shadow-slate-800">
        <h1 className="mb-5 font-bold uppercase text-2xl">Recover Password</h1>
        {Object.values(recPassErrors).map((error, i) => (
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
          {errors.email && (
            <p className="text-red-500 pb-2">Email is required</p>
          )}
          <ReCAPTCHA
            sitekey={env.KEY_SITE_RECAPTCHA}
            onChange={handleRecaptchaChange}
            className="pt-2 pb-2 flex justify-center"
          />

          <button
            disabled={isButtonDisabled}
            type="submit"
            className={
              isButtonDisabled
                ? "w-full text-lg bg-rose-400 text-slate-100 px-4 py-2 rounded-md my-2"
                : "w-full text-lg bg-red-500 text-slate-100 hover:bg-rose-600 duration-300 px-4 py-2 rounded-md my-2"
            }
          >
            send email
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
