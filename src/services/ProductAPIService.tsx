import { Products } from "../models/Products";

const apiBaseURL = "http://localhost:9002/";            // Base URL for the API

// Fetch all products from the API
export function getAllProductsAPI() {
  return fetch(apiBaseURL + "product", {
    method: "GET",
    mode: "cors",                                       // Enable cross-origin requests
  });
}

// Add a new product via API
export async function postProductAPI(product: Products) {
  const response = await fetch(apiBaseURL + "product", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },    // Set request header for JSON data
    body: JSON.stringify(product),                      // Convert product object to JSON string
  });

  if (!response.ok) {                                   
    const errorData = await response.json();            // Parse error response
    console.log("post response: ", errorData);          // Log server error details (for debugging)  
    throw new Error("Failed to add a product");         // Custom error message
  }

  const data = await response.json();
  return data;
}

// Delete a product via API
export const deleteProductAPI = async (productId: any) => {
  return await fetch(`${apiBaseURL}product/${productId}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
};

// Update an existing product via API
export const updateProductAPI = async (product: Products) => {
  return await fetch(`${apiBaseURL}product/${product.id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};
