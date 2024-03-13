import React, {useContext, useEffect, useState} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { getAllProductsAPI, postProductAPI } from "../services/ProductAPIService";
import { json } from "stream/consumers";
import { Products } from "../models/Products";
import { ProductList } from "../components/ProductList";
import { ProductAdd } from "../components/ProductAdd";


export function ProductsPage(){

    async function getAllProducts(){
        await getAllProductsAPI()
        .then(response => {return response.json()})
        .then(json => {console.log(json)});
    }

    /*
    async function postProduct(){
        // prepare data for the API call
        await postProductAPI()
        .then((response: { json: () => any; }) => {return response.json()})
        .then((json: any) => {console.log(json)})
        .catch((error: any) => {console.log(error)})
        window.location.reload(); //refresh page with results
    }
    */
    
    return (
    <>
    <h1> Product Page</h1>
    {/*<button className="secondary-button" onClick={getAllProducts}>Get all products</button>*/}
    <ProductList></ProductList>
    <ToastContainer />        {/* Render the ToastContainer for notifications */}

    </>
        )
}
