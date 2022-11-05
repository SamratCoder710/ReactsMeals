import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (val) => val.trim() === "";
const isFiveDigits = (val) => val.length === 5;
const Checkout = (props) => {
  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const nameIsValid = !isEmpty(inputNameRef.current.value);
    const streetIsValid = !isEmpty(inputStreetRef.current.value);
    const postalIsValid = isFiveDigits(inputPostalRef.current.value);
    const cityIsValid = !isEmpty(inputCityRef.current.value);

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }
    props.onPost({
      name: inputNameRef.current.value,
      street: inputStreetRef.current.value,
      postal: inputPostalRef.current.value,
      city: inputCityRef.current.value,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={inputNameRef}></input>
        {!formValidity.name && <p>Please enter name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          ref={inputStreetRef}
        ></input>
        {!formValidity.street && <p>Please enter your Street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postalCode">PostalCode</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          ref={inputPostalRef}
        ></input>
        {!formValidity.postal && <p>Please enter Postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" ref={inputCityRef}></input>
        {!formValidity.city && <p>Please enter City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Close
        </button>
        <button className={classes.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
