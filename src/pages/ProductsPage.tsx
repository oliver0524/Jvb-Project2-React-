import React, {useContext, useEffect, useState} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { getAllProductsAPI, postProductAPI } from "../services/ProductAPIService";
import { json } from "stream/consumers";
import { Products } from "../models/Products";
import { ProductList } from "../components/ProductList";
import { ProductAdd } from "../components/ProductAdd";


export function ProductsPage(){

    /*
    const [products, setProducts] = useState([]);    // State to store fetched products
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    const handleAddProductClick = () => {
        setShowForm(true);                           // Show the form on button click
      } */

      /*
    useEffect(() => {
        const fetchData = async () => {
          const response = await getAllProductsAPI();
          const json = await response.json();
          setProducts(json);
        };

        fetchData();
    }, []); // Empty dependency array ensures fetching only once
*/
    
    async function getAllProducts(){
        await getAllProductsAPI()
        .then(response => {return response.json()})
        .then(json => {console.log(json)});
    }

    async function postProduct(){
        // prepare data for the API call
        await postProductAPI()
        .then((response: { json: () => any; }) => {return response.json()})
        .then((json: any) => {console.log(json)})
        .catch((error: any) => {console.log(error)})
    }
    return (
    <>
    <h1> Product Page</h1>
    <ProductList></ProductList>
    <button className="primary-button" onClick={ProductAdd}>Add a product</button>
    {/*<button className="secondary-button" onClick={getAllProducts}>Get all products</button>*/}
    </>
        )
}
