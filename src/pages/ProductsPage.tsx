import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../DarkModeContext";
import { ToastContainer} from "react-toastify";
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",            // Arrange components with space between them
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
          <ProductAdd product={product} setProduct={setProduct} />  {/* Render the ProductAdd component */}
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
          <ProductList product={product} setProduct={setProduct} /> {/* Render the ProductList component */}
        </div>
      </div>
    </>
  );
}
