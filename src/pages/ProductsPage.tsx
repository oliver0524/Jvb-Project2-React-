import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../DarkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import {
  getAllProductsAPI,
  postProductAPI,
} from "../services/ProductAPIService";
import { json } from "stream/consumers";
import { Products } from "../models/Products";
import { ProductList } from "../components/ProductList";
import { ProductAdd } from "../components/ProductAdd";

export function ProductsPage() {
  const [product, setProduct] = useState<Products>({
    name: "",
    price: 0,
    sellername: "",
  });                                                 // Initialize product state with default values

  //console.log("Jamal");

  //Arrange the ProductAdd and ProductList components side by side using flexbox
  return (
    <>
      <h1> Product Page</h1>
      <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "25%", zIndex: 1, padding: "20px" }}> {/* Define fixed width for ProductAdd */}
          <ProductAdd   
            product={product}
            setProduct={setProduct} 
            />
        </div>
        <div
          style={{ flex: "0 0 1300px", overflowY: "auto" }}>     {/* Allow scrolling for long product lists */}
          <ProductList
          product={product}
          setProduct={setProduct}
        />
        </div>
      </div>
    </>
  );
}
