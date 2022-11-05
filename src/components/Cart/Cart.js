import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartItemAddHandler = (item) => {
    ctx.addItem({
      ...item,
      amount: 1,
    });
  };
  const submitCartHandler = async (data) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-b06ae-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          cart: ctx.items,
          personalInfo: data,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };
  const isSubmittingContent = <Modal>Sending your data ...</Modal>;
  const didSubmitContent = (
    <Modal>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Modal>
  );
  const orderMeal = () => {
    setShowCheckout(true);
  };
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const cart = (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {ctx.items.length > 0 && (
          <button className={classes.button} onClick={orderMeal}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
  return (
    <React.Fragment>
      {!showCheckout && cart}
      {!isSubmitting && !didSubmit && showCheckout && (
        <Modal>
          <Checkout onPost={submitCartHandler} onClose={props.onCloseCart} />
        </Modal>
      )}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </React.Fragment>
  );
};

export default Cart;
