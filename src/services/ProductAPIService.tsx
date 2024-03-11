import { Products } from "../models/Products";

const apiBaseURL = "http://localhost:9002/"
export function getAllProductsAPI(){
    return fetch(apiBaseURL+"product",{
            method:"GET",
            mode:"cors"
        });
}