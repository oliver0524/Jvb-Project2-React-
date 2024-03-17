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
    <div>
      <h1> Seller Page</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",                      // Arrange components with space between them
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <SellerForm onSellerCreated={fetchSellers} />         {/* Render the SellerForm component */}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {sellers.length == 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h6>No sellers</h6>                               {/* Display a message if no sellers exist */}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Sellers</h1>
              {sellers.map((seller) => (
                <SellerCard key={seller.sellername} seller={seller} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
