import React from "react";
import { Seller } from "../models/Seller";
import { createSeller } from "../services/SellerAPIService";

interface SellerFormProps {
  onSellerCreated: () => void;
}

const SellerForm: React.FC<SellerFormProps> = ({ onSellerCreated }) => {
  const [sellerName, setSellerName] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sellerData: Seller = {
      sellername: sellerName,
    };

    createSeller(sellerData)
      .then((response) => {
        if (response.status == 400) {
          alert("Error Occured While Adding Seller");
        }
        return response;
      })
      .then((data) => {
        onSellerCreated();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="step-info">
          <p>Seller</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              placeholder="Seller Name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
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
