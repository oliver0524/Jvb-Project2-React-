import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { getAllProductsAPI, postProductAPI, deleteProductAPI, updateProductAPI } from '../services/ProductAPIService';
import { Products } from '../models/Products';
import { SingleProduct } from './SingleProduct';

export function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);  //Products array
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false); // Initialize to false to hide them buttons on start

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
  
  // Add a product. Notificaitons pop-up for a successful and unsuccessful adds
  async function postProduct() { // Assuming product data is prepared elsewhere
    try {
      //const response = await postProductAPI(); // Call the API with data
      const newProduct = await postProductAPI(); // Call the API with data
      console.log('Product added successfully:', newProduct); // Log success message
      toast.success('Product added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true});
  
      // Update products state in your component; adds it to the array
      setProducts((prevProducts) => [...prevProducts, newProduct]);
  
    } catch (error) {
      console.error('Error adding product:', error); // Log the error
      setErrorMessage((error as Error).message);    //Server error message
      toast.warning(`Product was not added! Error: ${(error as Error).message}` , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true});
    }
  }
  
  //handleDelete removes an item from the array based on product.id
  async function handleDelete(productId: number | undefined) {
    try {
      
      await deleteProductAPI(productId); // delete product from the server-side
      
    // Update the state by filtering out the deleted product. Provide pop-up notifications
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));  //delete product from the state
    console.log('delete successful', products);   
    toast.success('Product deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true});
     } catch (error) {
      console.log('delete unsuccessful', products); 
      setErrorMessage((error as Error).message); //Server error message
      toast.warning('Product was not deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true});
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
  // The SingleProduct component receives the data prop, which displays individual product details.
  // Two buttons: for add a product and show/hide More Actions for individual delete/update */
  return (
    <div>
      <header className="button-header">
      <h2>Product List</h2>
      <button className="primary-button" onClick={postProduct}>Add a product</button>
      <button className="primary-button" onClick={() => 
        setShowButtons(!showButtons)}>{showButtons ? 'Hide Actions' : 'More Actions'}
      </button>
      </header>
      {products.length > 0 ? (
        <div>
          <div className="productList" style={{fontWeight: 'bold', padding: 10}}>NAME PRICE SELLER</div>
        <ul className="productList">
          {products.map((product) => (
            <li key={product.id} className="productItem">
               <SingleProduct data={product}></SingleProduct>
               {showButtons && (
               <div className="productList">
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <button onClick={() => handleUpdate(product.id)}>Update</button>
                </div>
                )}
            </li>
          ))}
        </ul>
        <ToastContainer /> {/* Render the ToastContainer for pop-up notifications */}
        </div>
      ) : (
        <p>No products to display</p>
      )}
    </div>
  );
}

export default ProductList;