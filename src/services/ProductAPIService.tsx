import { json } from "react-router-dom";
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
  
  console.log("post API: ", apiBaseURL + "product");
  const response = await fetch(apiBaseURL + "product", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },      // Set request header for JSON data
    body: JSON.stringify(product),                        // Convert product object to JSON string
  });
   
  if (!response.ok) {                                   
    console.log("post error: ", response);                // Log server error details (for debugging)  

  try {
  const responseData = await response.json(); 
  console.log("post error resp: ", responseData);
  throw new Error("Failed to add a product: " + responseData.Error); // Use error message from response
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("!" + error);                         // Rethrow the error to the calling code
  }
}
  const responseData = await response.json();
  console.log("post resp: ", responseData);
  return responseData;
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
  console.log("update api: ", `${apiBaseURL}product/${product.id}`);
  const response =  await fetch(`${apiBaseURL}product/${product.id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    console.log("put error: ", response);                     // Log the entire response for debugging

    try {
      const responseData = await response.json(); 
      console.log("put error resp: ", responseData);
      throw new Error("Failed to update product: " + responseData.Error); // Use error message from response
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("!" + error);                         // Rethrow the error to the calling code
      }
    }
      const responseData = await response.json();
      console.log("put resp: ", responseData);
      return responseData;
    };

