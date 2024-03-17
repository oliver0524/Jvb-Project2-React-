import React, { useEffect, useState } from "react";
import "../seller_page.css";
import { Seller } from "../models/Seller";
import SellerForm from "../components/SellerForm";
import { getAllSellersAPI } from "../services/SellerAPIService";
import SellerCard from "../components/SellerCard";

const SellerPage = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);         // Initialize sellers state as an empty array

  const fetchSellers = () => {
    getAllSellersAPI()                                          // Call the getAllSellersAPI function
      .then((response) => {
        return response.json();                                 // Parse the response as JSON
      })
      .then((data) => {
        const sellerData: Seller[] = data.map((name: string, index: number) => {
          return {
            sellername: name,                                   // Create a seller object with the seller name
          };
        });

        setSellers(sellerData);                                 // Update the sellers state with fetched data
      })
      .catch((error) => {
        console.log("Error fetching or parsing data:", error);
      });
  };

  useEffect(() => {
    fetchSellers();                                             // Fetch sellers data when the component mounts
  }, []);


  //Conditional Rendering for the "sellers.length == 0" condition 
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <h1 style={{ textAlign: "center"}}>Seller Page</h1>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <SellerForm onSellerCreated={fetchSellers} />
      </div>
      <div style={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
        {sellers.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <h6>No sellers to display</h6>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{textAlign: "center" }}>Sellers</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {sellers.map((seller) => (
              <SellerCard key={seller.sellername} seller={seller} />
            ))}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
