import React, {useContext, useEffect, useState} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { Products } from "../models/Products";
import { SingleProduct } from "./SingleProduct";
import { getAllProductsAPI } from "../services/ProductAPIService";
import {json} from "stream/consumers";


export function ProductList(){
    const [allProducts, setAllProducts] = useState<Products[]>([])
    
    useEffect(()=>{
        getAllProductsAPI()
        .then(response=>{return response.json()})
        .then(json=>{
            setAllProducts(json);
        });
    }, []);
    
    return (<>
    <h1> Product List</h1>
    {allProducts.map(product =>{return <SingleProduct key={product.product_id} data={product}></SingleProduct>})}
    </>)
}