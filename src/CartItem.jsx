import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button className="get-started-button1" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Price: {item.price.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <div className="cart-item-total">Total: {(item.price * item.quantity).toFixed(2)}</div>
                <button className="cart-item-delete" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total_cart_amount">Grand Total: ${calculateTotalAmount()}</div>
          <button className="get-started-button1 continue_shopping_btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
