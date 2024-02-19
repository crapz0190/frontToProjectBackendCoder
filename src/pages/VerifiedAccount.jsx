import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifiedAccountRequest } from "../api/auth";

const VerifiedAccount = () => {
  const { token } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await verifiedAccountRequest(token);
        navigate("/users/cuenta-activada");
      } catch (error) {
        navigate("/users/error");
      }
    };

    activateAccount();
  }, [token, navigate]);

  return null; // No necesitas renderizar nada en este componente, ya que la redirección sucederá automáticamente
};

export default VerifiedAccount;
