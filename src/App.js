import React, { useState } from "react";
import Header from './components/UI/Header';
import './App.css';
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";
import MealAddButton from "./components/Admin/MealAddButton";

function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler = ()=>{
    setCartIsShown(true);
  }

  const hideCartHandler = ()=>{
    setCartIsShown(false);
  }

  return (
     <CartProvider >
       {cartIsShown && <Cart onCloseCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <img src="meals.jpg" alt='meals'></img>
      <div className="imgBottom"></div>
      <Meals/>
      <MealAddButton/>
      </CartProvider>
  );
}

export default App;
