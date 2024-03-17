import React, { useState } from "react";
import {
  postProductAPI,
  updateProductAPI,
} from "../services/ProductAPIService";         // Import API service functions
import { Products } from "../models/Products";  // Import the Products model
import { toast } from "react-toastify";         // Import toast notifications

interface ProductAddProps {
  product: Products;
  setProduct: React.Dispatch<React.SetStateAction<Products>>;       // Define the setProduct function type
    }

export function ProductAdd({ product, setProduct}: ProductAddProps): React.JSX.Element {
  const [error, setError] = useState("");                           // Initialize error state

  const resetForm = () => {
    setProduct({ name: "", price: 0, sellername: "" });
  };

  // Handle input changes
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setProduct({ ...product, [e.target.name]: e.target.value?.trim() });
  };

   // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");                                                 // Clear any previous errors

    if (product.price <= 0.0) {
      setError("Price must be greater than 0");                   // Set error state
      return;
    }

    console.log("product id: ", product.id);

    if (product.id == undefined) {
      try {                                                         // If product ID does not exist, add a new product
        const response = await postProductAPI(product);             // Call the postProductAPI function
          console.log("product add : ", response);
          toast.success(`Product "${response.name}" added successfully`);
          setProduct({ name: "", price: 0, sellername: "" });       // Reset the product state
          setError("");   
      } catch (error: any) {
        const errorMessage = error.message || "Failed to add product"; //Msg from backedn or Default message
        toast.error(errorMessage);
        resetForm();
      }   
    } else {
  try {                                                           // If product exists, update product
    const response = await updateProductAPI(product);             // Call the put API function
      console.log("product update: ", response);
      toast.success(`Product "${response.name}" updated successfully`);
      setProduct({ name: "", price: 0, sellername: "" });        // Reset the product state
      setError("");   
  } catch (error: any) {
    const errorMessage = error.message || "Failed to update product"; //Msg from backedn or Default message
    toast.error(errorMessage);
  }   
}
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="step-info">
            <p>Product</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={product?.name || ""}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="sellername"
                name="sellername"
                value={product.sellername}
                onChange={handleChange}
                placeholder="Seller Name"
                required
              />
            </div>
            <button type="submit" className="button">
              {product.id ? "Update Product" : "Add Product"}
            </button>
            {product.id ? (
              <button
                style={{backgroundColor: "red",margin: "10px 0px 0px 0px",}}
                type="submit"
                className="button"
                onClick={() =>
                  setProduct({ name: "", price: 0, sellername: "" })
                }
              >
                Cancel Update
              </button>
            ) : (
              ""
            )}
          </form>
          <div
            style={{padding: "15px 0px 0px 0px",}}
          >
            <span
              style={{color: "red",fontSize: "13px",}}
            >
              {error && <p>{error}</p>}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
