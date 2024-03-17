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
  onSubmit: () => void;                                             //
}

export function ProductAdd({ product, setProduct }: ProductAddProps) {
  const [error, setError] = useState("");                           // Initialize error state
  const [submitting, setSubmitting] = useState(false);              // State to track form submission

  // Handle input changes
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");                                                 // Clear any previous errors
    setSubmitting(true);                                          // set submitting state to true

    if (product.id != undefined) {
      try {                                                       // If product ID exists, update the product
        const response = await updateProductAPI(product);         // Call the updateProductAPI function
        console.log(response);
        if (response.status == 400) {
          toast.error("Error Occured While Updating Product");    // Display an error toast
        } else {
          toast.success(`Product "${product?.name}" updated successfully`);
          setProduct({ name: "", price: 0, sellername: "" });     // Reset the product state
        }
      } catch (error) {
        setError("Failed to update product");
        toast.error(`Product "${product?.name}" is not updated`);
      }
      return;
    }

    try {                                                         // If product ID does not exist, add a new product
      const response = await postProductAPI(product);             // Call the postProductAPI function
      toast.success(`Product "${product?.name}" added successfully`);
      setProduct({ name: "", price: 0, sellername: "" });         // Reset the product state
    } catch (error) {
      setError("Failed to add product");                          // Set an error message
      toast.error("Failed to add product");
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
                value={product.name}
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
