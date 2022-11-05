import React, { useContext, useEffect, useState } from "react";
import classes from "./CartSection.module.css";
import CartContext from "../store/cart-context";

const CartSection = () => {
  const ctx = useContext(CartContext);
  const [btnHigh, setBtnHigh] = useState(false);
  const numberOfItems = ctx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const { items } = ctx;
  useEffect(() => {
    setBtnHigh(true);

    const timer = setTimeout(() => {
      setBtnHigh(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnClasses = `${classes.cartHolder} ${btnHigh ? classes.bump : ""}`;
  return (
    <React.Fragment>
      <div className={btnClasses}>
        <img
          className={classes.cartImg}
          src="shopping-cart.png"
          alt="cart"
        ></img>
        <span className={classes.cartText}> Your Cart </span>
        <span className={classes.cartCount}>{numberOfItems}</span>
      </div>
    </React.Fragment>
  );
};

export default CartSection;
