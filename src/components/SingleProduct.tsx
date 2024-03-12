import React, {useContext} from "react";
import { DarkModeContext } from "../DarkModeContext";
import { Products } from "../models/Products";

interface propsInterface {
    data:Products
}

export function SingleProduct(props:propsInterface){
    console.log('SingleProduct props:', props.data);

    return (
    <>
    <h2>{props.data.name}</h2>
    <p>{props.data.id}</p>
    <p>{props.data.price}</p>
    <p style={{fontStyle:"italic"}}>{props.data.sellername}</p>
    </>
    )
}
