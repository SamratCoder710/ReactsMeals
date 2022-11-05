import {  useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const [isValidAmount, setIsValidAmount] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountInNum = +enteredAmount;

    if (
      enteredAmountInNum < 1 ||
      enteredAmountInNum > 5 ||
      enteredAmount.trim().length === 0
    ) {
      setIsValidAmount(false);
      return;
    }
    props.onAddToCart(enteredAmountInNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValidAmount && <div>Invalid Amount</div>}
    </form>
  );
};

export default MealItemForm;
