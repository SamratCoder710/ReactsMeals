import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingItem];
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedAmount };
  }
  if (action.type === "REMOVE") {
    const existingItem = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingItem];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [ ...state.items ];
      updatedItems[existingItem] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if(action.type === 'CLEAR'){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };
  const clearCart = () => {
    dispatchCartAction({type:"CLEAR"});
  }

  const contextData = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={contextData}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
