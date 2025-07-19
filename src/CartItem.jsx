import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { useDispatch } from 'react-redux'; 

const CartItem = ({ onContinueShopping }) => {
  const [showCart, setShowCart] = useState(true);
  const [addedItems, setAddedItems] = useState([]); 
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1));
      total += cost * quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
    onContinueShopping(e);
  };

  const handleAddToCartClick = (itemName) => { 
    if (!addedItems.includes(itemName)) {
      setAddedItems([...addedItems, itemName]);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    const totalCost = unitPrice * item.quantity;
    return `$${totalCost}`;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: {calculateTotalCost(item)}</div> 
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              
            
              <button
                onClick={() => handleAddToCartClick(item.name)}
                style={{
                  backgroundColor: addedItems.includes(item.name) ? 'grey' : '#007bff',
                  color: 'white',
                  padding: '6px 12px',
                  marginTop: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {addedItems.includes(item.name) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
