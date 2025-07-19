// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // Array to hold cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addItem: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.find(item => item.name === newItem.name);
      if (!exists) {
        state.items.push(newItem); // Add only if not already in cart
      }
    },

    
    removeItem: (state, action) => {
      const nameToRemove = action.payload;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
});


export const { addItem, removeItem, updateQuantity } = cartSlice.actions;


export default cartSlice.reducer;
