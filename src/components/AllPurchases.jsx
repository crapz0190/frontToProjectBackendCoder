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

  console.log(userPurchase);

  return <div className="pt-40">AllPurchases</div>;
};

export default AllPurchases;
