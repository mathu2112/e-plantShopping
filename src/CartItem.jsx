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
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button className="continue-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                    } else {
                      dispatch(removeItem(item.id));
                    }
                  }}
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                >
                  +
                </button>
              </div>
              <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button className="delete-btn" onClick={() => dispatch(removeItem(item.id))}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItem;
