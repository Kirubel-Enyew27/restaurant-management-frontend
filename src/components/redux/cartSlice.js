import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // Stores cart items as an object
  totalPrice: 0, // Stores the total price
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (state.items[item.MealID]) {
        state.items[item.MealID].quantity += 1;
      } else {
        state.items[item.MealID] = { ...item, quantity: 1 };
      }
      state.totalPrice = calculateTotal(state.items); // Update total
    },
    incrementQuantity: (state, action) => {
      const mealID = action.payload;
      if (state.items[mealID]) {
        state.items[mealID].quantity += 1;
      }
      state.totalPrice = calculateTotal(state.items); // Update total
    },
    decrementQuantity: (state, action) => {
      const mealID = action.payload;
      if (state.items[mealID]) {
        state.items[mealID].quantity -= 1;
        if (state.items[mealID].quantity <= 0) {
          delete state.items[mealID];
        }
      }
      state.totalPrice = calculateTotal(state.items); // Update total
    },
    removeItem: (state, action) => {
      const mealID = action.payload;
      if (state.items[mealID]) {
        delete state.items[mealID];
      }
      state.totalPrice = calculateTotal(state.items); // Update total
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = calculateTotal(state.items);
    },
  },
});

// Helper function to calculate total price
const calculateTotal = (items) => {
  return Object.values(items).reduce(
    (acc, item) => acc + item.Price * item.quantity,
    0
  );
};

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  calculateTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
