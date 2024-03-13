import { Products } from "../models/Products";

const apiBaseURL = "http://localhost:9002/"

// prepare data for the API call -- get all products
export function getAllProductsAPI(){
    console.log("url: ", apiBaseURL+"product");
    return fetch(apiBaseURL+"product",{
            method:"GET",
            mode:"cors"
        });
}

// prepare data for the API call -- post a product
export async function postProductAPI(){
  console.log("post url: ", apiBaseURL + "product");
    const response = await fetch(apiBaseURL + "product",{
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "iphone15", price: 1000, sellername: "Apple" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("post response: ", errorData);
      throw new Error('Failed to add a product'); //Server-provided message or default
    }
  
    const data = await response.json();
    return data;
  };

// prepare data for the API call -- delete a product
export const deleteProductAPI = async (productId: any) => {
  console.log("delete url: ", `${apiBaseURL}product/${productId}`);
    const response = await fetch(`${apiBaseURL}product/${productId}`, {
      method:"DELETE",
      mode:"cors",
      headers:{"Content-Type":"application/json"}
    })
  };

  // prepare data for the API call -- update a product
export const updateProductAPI = async (productId: any) => {
  console.log("update url: ", `${apiBaseURL}product/${productId}`);
    const response = await fetch(`${apiBaseURL}product/${productId}`, {
      method:"PUT",
      mode:"cors",
      headers:{"Content-Type":"application/json"}
    })
  
    if (!response.ok) {
      throw new Error('Failed to update a product'); //Server-provided message or default
    }
  
    return response.json();
  };