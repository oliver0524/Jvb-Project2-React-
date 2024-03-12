import React, { useState } from 'react';
import { postProductAPI } from '../services/ProductAPIService';

export function ProductAdd() {
  const [product, setProduct] = useState({
    product_name: '',
    product_price: 0,
    seller_name: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await postProductAPI();
      const data = await response.json();
      console.log('Product added:', data);
      // Reset the form or perform any other necessary actions
      setProduct({ product_name: '', product_price: 0, seller_name: '' });
    } catch (error) {
      setError('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="product_price">Product Price:</label>
          <input
            type="number"
            id="product_price"
            name="product_price"
            value={product.product_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="seller_name">Seller Name:</label>
          <input
            type="text"
            id="seller_name"
            name="seller_name"
            value={product.seller_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}