import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Make sure addItem is imported
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const [showCart, setShowCart] = useState(true);
  const [addedItems, setAddedItems] = useState([]); // Track buttons clicked
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 🛒 Total quantity in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1));
      total += cost * quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
    onContinueShopping(e);
  };

  const handleAddToCartClick = (item) => {
    if (!addedItems.includes(item.name)) {
      dispatch(addItem({
        name: item.name,
        cost: item.cost,
        image: item.image,
        quantity: 1
      }));
      setAddedItems([...addedItems, item.name]);
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

  const handleCheckoutShopping = () => {
    alert('Proceeding to checkout!');
    // Navigate or handle checkout logic here
  };

  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    const totalCost = unitPrice * item.quantity;
    return totalCost.toFixed(2); // No `$` here
  };

  return (
    <div className="cart-container">
      {/* Trolley count shown here (optional positioning) */}
      <div className="trolley-icon-wrapper">
        <i className="fa fa-shopping-cart" style={{ fontSize: '24px', position: 'relative' }}>
          <span className="cart-icon-count">{cartCount}</span>
        </i>
      </div>

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
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>

              {/* Add to Cart / Added to Cart Button */}
              <button
                onClick={() => handleAddToCartClick(item)}
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
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
