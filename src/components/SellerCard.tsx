import React from "react";
import { Seller } from "../models/Seller";

interface SellerCardProps {
  seller: Seller;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  return (
    <div className="seller_card">
      <h2>{seller.sellername}</h2>
    </div>
  );
};

export default SellerCard;