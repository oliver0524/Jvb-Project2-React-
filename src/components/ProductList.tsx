import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";   // Import toast notifications
import "react-toastify/dist/ReactToastify.css";           // Import toast styles
import JSONbig from "json-bigint";                        // Import JSONbig library for handling large integers
import {
  getAllProductsAPI,
  postProductAPI,
  deleteProductAPI,
  updateProductAPI,
} from "../services/ProductAPIService";                   // Import API service functions
import { Products } from "../models/Products";            // Import the Products model
import { SingleProduct } from "./SingleProduct";          // Import the SingleProduct component

interface ProductProps {
  product: Products;
  setProduct: React.Dispatch<React.SetStateAction<Products>>;       // Define the setProduct function type
}

export function ProductList({ product, setProduct }: ProductProps) {
  const [products, setProducts] = useState<Products[]>([]);         // Initialize products state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Initialize error message state
  const [change, setChange] = useState(false);                      // Initialize change state (used for triggering updates)
  const [hide, setHide] = useState(false);                          // Initialize hide state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsAPI();                 // Await the API response
        const data = await response.text();                         // Convert response to text
        const parsedData = JSONbig.parse(data);                     // Parse JSON data using JSONbig library
        setProducts(parsedData);                                    // Update products state
      } catch (error) {
        toast.error("Error fetching products:\n" + error);
      }
    };
  
    fetchProducts();
  }, []);

  async function handleDelete(product: Products | undefined) {
    try {
      const result = await deleteProductAPI(product?.id); // Call the deleteProductAPI function
      toast.success(`Product "${product?.name}" deleted successfully`);      
      setChange(!change);                                 // Toggle the 'change' state to trigger re-fetching products
    } catch (error) {
      setErrorMessage((error as Error).message);          // Set an error message
      toast.warn(`Product "${product?.name}" is not deleted`);  
    } 
  }

  
  //handleUpdate update an item based on product.id
  function handleUpdate(product: Products) {
    try {
      setProduct(product);                                // Set the product state with the selected product
      setChange(!change);                                 // Toggle the 'change' state to trigger re-fetching products
      toast.success(`Product "${product?.name}" updated successfully`);
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.warn(`Product "${product?.name}" is not updated`);
    }
  }


  return (
    <div>
      {products.length > 0 ? (
        <div>
          <div
            className="productList"
            style={{ fontWeight: "bold", padding: 10, fontSize: "40px" }}
          >
            Products
          </div>
          <button
            style={{
              maxWidth: "140px",
              backgroundColor: hide ? "red" : "green",
            }}
            className="button"
            onClick={() => setHide(!hide)}
          >
            {hide ? "Hide" : "Show"} Action
          </button>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            className="productList"
          >
            {products.map((product, index) => (             
              <SingleProduct
                key={index}
                data={product}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                hide={hide}
              ></SingleProduct>
            ))}
          </ul>
          <ToastContainer />
        </div>
      ) : (
        <p>No products to display</p>
      )}
    </div>
  );
}

export default ProductList;
