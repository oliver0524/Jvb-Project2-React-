import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
import { Products } from "../models/Products";

interface propsInterface {
  data: Products;                                         // Define the product object type
  handleUpdate: (product: Products) => void;              // Define the handleUpdate function type
  handleDelete: (product: Products | undefined) => void;  // Define the handleDelete function type
  hide: boolean;                                          // Boolean flag to control displaying additional buttons
}

export function SingleProduct(props: propsInterface) {

// The component renders a div with the class name “container.”
// Inside the div, it displays the product name, price, and seller name.
// If hide is true, it also renders “Update” and “Delete” buttons  
  return (
    <>
      <div
        className="container"
        style={{
          width: "650px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <h3 className="">{props.data.name}</h3>
        <p className="">Price: {props.data.price}</p>
        <p className="">Seller: {props.data.sellername}</p>
        {props.hide ? (                                       
          <div
            className=""
            style={{
              display: "flex",
              margin: "10px 0",
            }}
          >
            <button
              className="button"
              onClick={() => props.handleUpdate(props.data)}   // Call handleUpdate when the button is clicked
            >
              Update
            </button>
            <button
              style={{
                backgroundColor: "red",
              }}
              className="button"
              onClick={() => props.handleDelete(props.data)}   // Call handleDelete when the button is clicked
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
