import React, { useEffect, useState } from "react";
import "../seller_page.css";
import { Seller } from "../models/Seller";
import SellerForm from "../components/SellerForm";
import { getAllSellersAPI } from "../services/SellerAPIService";
import SellerCard from "../components/SellerCard";

const SellerPage = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);

  const fetchSellers = () => {
    getAllSellersAPI()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const sellerData: Seller[] = data.map((name: string, index: number) => {
          return {
            sellername: name,
          };
        });

        setSellers(sellerData);
      })
      .catch((error) => {
        console.log("Error fetching or parsing data:", error);
      });
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div>
      <h1> Seller Page</h1>
      
      <SellerForm onSellerCreated={fetchSellers} />
      {sellers.length == 0 ? (
        <p>No sellers</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {sellers.map((seller) => (
            <SellerCard key={seller.sellername} seller={seller} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPage;
