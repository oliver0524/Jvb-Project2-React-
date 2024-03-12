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
export function postProductAPI(){
    return fetch(apiBaseURL+"product", {
        method:"POST",
        mode:"cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:"iphone15", price:1000, sellername: "Apple"})
    })
}