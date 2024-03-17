import React, { useContext } from "react";
import { Seller } from "../models/Seller";
import { DarkModeContext } from "../DarkModeContext";

interface SellerCardProps {
  seller: Seller;                     // Define the seller object type
}

// The SellerCard component receives a seller object as a prop.
const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {

//Inside the div, it displays the seller’s name using the seller.sellername property
  return (
    <div
      className="seller_card"
      //style={{
      //  backgroundColor: "white",
      //  color: "black",
      //}}
    >
      <h2>{seller.sellername}</h2>
    </div>
  );
};

export default SellerCard;
