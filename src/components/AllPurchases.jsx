/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const AllPurchases = () => {
  const { uid } = useParams();
  const { allPurchasesUser, userPurchase } = UseAuth();

  useEffect(() => {
    const purchase = async () => {
      try {
        await allPurchasesUser(uid);
      } catch (error) {
        console.log(error);
      }
    };
    purchase();
  }, [uid]);

  const ticketData = userPurchase ? userPurchase.data.payload : null;

  return (
    <div className="h-screen mt-24 w-auto px-5">
      <h1 className="uppercase font-semibold text-center mt-10">
        Tickets de compras realizadas
      </h1>

      {ticketData && ticketData.length > 0 ? (
        ticketData.map((ticket) => (
          <div
            key={ticket._id}
            className="border border-slate-400 mt-5 px-5 py-2 flex justify-between items-center gap-x-16  p-10 rounded-lg shadow-xl"
          >
            <p>Nro Trans.: {ticket.code}</p>
            <p>Dia: {ticket.purchase_datetime}</p>
            <p>email: {ticket.purchaser}</p>
            <p>Total: $ {ticket.amount}</p>
          </div>
        ))
      ) : (
        <p>No hay tickets de compras para mostrar.</p>
      )}
    </div>
  );
};

export default AllPurchases;
