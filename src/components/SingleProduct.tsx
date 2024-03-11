import React, {useContext} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { Products } from "../models/Products";

interface propsInterface {
    data:Products
}

export function SingleProduct(props:propsInterface){

    return (<>
    <h1> Product Details Page</h1>
    <h2>{props.data.product_name}</h2>
    <p>{props.data.product_name}</p>
    <p>{props.data.product_price}</p>
    <p style={{fontStyle:"italic"}}>{props.data.seller_name}</p>
    </>)
}
