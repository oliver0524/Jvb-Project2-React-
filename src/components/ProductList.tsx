import React, { useEffect, useState } from 'react';
import { getAllProductsAPI } from '../services/ProductAPIService';
import { Products } from '../models/Products';

export function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);

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

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ display: 'flex', flexWrap: 'wrap' }}>
              <h3 className = "navbar_item">{product.name}</h3>
              <p className = "navbar_item"> | Price: ${product.price}</p>
              <p className = "navbar_item">| Seller: {product.sellername}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}