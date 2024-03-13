import React, {useContext} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { Products } from "../models/Products";

//Define an interface called propsInterface to specify the expected shape of the props object
//The data prop is of type Products
interface propsInterface {
    data:Products
}

export function SingleProduct(props:propsInterface){
    console.log('SingleProduct props:', props.data);   //log the props.data object to the console

    return (
    <>
    <h3 className="productList">{props.data.name}</h3>
    <p className="productList">{props.data.id}</p>
    <p className="productList">{props.data.price}</p>
    <p className="productList">{props.data.sellername}</p>
    </>
    )
}
