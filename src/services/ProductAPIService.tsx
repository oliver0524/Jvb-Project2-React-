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
  try {
  console.log("post API: ", apiBaseURL + "product");
  const response = await fetch(apiBaseURL + "product", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },    // Set request header for JSON data
    body: JSON.stringify(product),                      // Convert product object to JSON string
  });

  const responseData = await response.json();     

  if (!response.ok) {                                   
    console.log("post error: ", response);             // Log server error details (for debugging)  
    throw new Error("Failed to add a product");         // Custom error message
  }
  console.log("post resp: ", responseData);
  return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
  throw error;                                          // Rethrow the error to the calling code
}}

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
  console.log("update api: ", `${apiBaseURL}product/${product.id}`);
  return await fetch(`${apiBaseURL}product/${product.id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};
