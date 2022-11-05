import React from "react";
import styles from "../Cart/Checkout.module.css";
const MealsForm = (props) => {
  const closeForm = ()=>{
    props.onClose();
  }
  const mealFormHandler = (event)=>{
  event.preventDefault();
  const res = {
    name:event.target.name.value,
    description:event.target.description.value,
    price:event.target.price.value
  }
  closeForm();
const postConfig = {
    method:'POST',
    body:JSON.stringify(res),
    headers:{
        'Content-Type':'application/json'
    }
};
fetch('https://react-http-b06ae-default-rtdb.firebaseio.com/meals.json',postConfig);
  }
  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={mealFormHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name"></input>
        </div>
        <div className={styles.control}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description"></input>
        </div>
        <div className={styles.control}>
          <label htmlFor="price">Price</label>
          <input type="text" id="price"></input>
        </div>
        <div className={styles.formbutton}>
        <button>Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default MealsForm;
