import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css'; // optional

const sampleProducts = [
  {
    id: 1,
    name: 'Snake Plant',
    price: '$15',
    image: 'https://via.placeholder.com/150?text=Snake+Plant',
  },
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    price: '$30',
    image: 'https://via.placeholder.com/150?text=Fiddle+Leaf+Fig',
  },
  {
    id: 3,
    name: 'Monstera',
    price: '$25',
    image: 'https://via.placeholder.com/150?text=Monstera',
  },
];

const ProductList = ({ onViewCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-list">
      <h2>Plant Collection</h2>
      <div className="product-grid">
        {sampleProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button className="view-cart-btn" onClick={onViewCart}>
        View Cart
      </button>
    </div>
  );
};

export default ProductList;
