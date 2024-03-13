import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { getAllProductsAPI, postProductAPI, deleteProductAPI, updateProductAPI } from '../services/ProductAPIService';
import { Products } from '../models/Products';
import { SingleProduct } from './SingleProduct';

export function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);  //Products array
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsAPI();
        const data = await response.json();
        setProducts(data);
        console.log ("data: ", data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  
  async function postProduct() { // Assuming product data is prepared elsewhere
    try {
      //const response = await postProductAPI(); // Call the API with data
      const newProduct = await postProductAPI(); // Call the API with data
      console.log('Product added successfully:', newProduct); // Log success message
      toast.success('Product added successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true});
  
      // Update products state in your component
      setProducts([products, newProduct]);
  
    } catch (error) {
      console.error('Error adding product:', error); // Log the error
      toast.warning('Product was not added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true});
    }
  }
  
  //handleDelete removes an item from the array based on product.id
  async function handleDelete(productId: number | undefined) {
    try {
      
      await deleteProductAPI(productId); // delete product from the server-side
      
    // Update the state by filtering out the deleted product
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));  //delete product from the state
    console.log('delete successful', products);   
     } catch (error) {
      console.log('delete unsuccessful', products); 
      setErrorMessage((error as Error).message); //Server error message
    }
  };

  //handleUpdate update an item based on product.id
  async function handleUpdate(productId: number | undefined) {
    try {
      // update product from the server-side
      await updateProductAPI(productId);
    } catch (error) {
      setErrorMessage((error as Error).message); //Server error message
    }
  };

  /* The products.map function iterates over the products array and generates a list of product items.
  // The SingleProduct component receives the data prop, which displays individual product details.*/
  return (
    <div>
      <header>
      <h2>Product List</h2>
      <button className="primary-button" onClick={postProduct}>Add a product</button>
      </header>
      {products.length > 0 ? (
        <div>
          <div className="productList" style={{fontWeight: 'bold', padding: 10}}>NAME ID PRICE SELLER Action</div>

        <ul className="productList">
          {products.map((product) => (
            <li key={product.id} className="productItem">
               <SingleProduct data={product}></SingleProduct>
               <div className="productList">
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <button onClick={() => handleUpdate(product.id)}>Update</button>
                </div>
            </li>
          ))}
        </ul>
        <ToastContainer /> {/* Render the ToastContainer for notifications */}
        </div>
      ) : (
        <p>No products to display</p>
      )}
    </div>
  );
}

export default ProductList;