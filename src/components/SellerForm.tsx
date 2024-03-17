import React from "react";
import { Seller } from "../models/Seller";
import { createSeller } from "../services/SellerAPIService";
import { toast } from "react-toastify";

// Define the callback function for when a seller is created
interface SellerFormProps {
  onSellerCreated: () => void;
}

const SellerForm: React.FC<SellerFormProps> = ({ onSellerCreated }) => {
  const [sellerName, setSellerName] = React.useState<string>("");       // Initialize sellerName state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();                                                 // Prevent default form submission behavior

    const sellerData: Seller = {
      sellername: sellerName,                                           // Create a seller object with the entered seller name
    };

    createSeller(sellerData)                                            // Calls the createSeller API function.
      .then((response) => {
        if (response.status == 400) {
          toast.error("Error Occured While Adding Seller");
        }
        return response;
      })
      .then((data) => {
        toast.success("Seller Added Successfully");
        onSellerCreated();                                              // Invoke the callback function to notify parent component
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Displays step information (e.g., “Seller”); input field for entering the seller name; Submit button to add the seller.
  return (
    <div>
      <div className="container">
        <div className="step-info">
          <p>Seller</p>
        </div>
        <form onSubmit={handleSubmit}>                                  {/*On submit event, call the handleSubmit function*/}
          <div className="form-group">
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              placeholder="Seller Name"                                 // Placeholder for seller name input
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}           // Update sellerName state on input change
              required
            />
          </div>
          <button type="submit" className="button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
