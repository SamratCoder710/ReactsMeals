import classes from './MealAddButton.module.css';
import React, { useState } from 'react';
import MealsForm from '../Meals/MealsForm';
import Modal from '../UI/Modal';
const MealAddButton = (props)=>{
  const [showAddMealForm,setShowAddMealForm] = useState(false);
  const AddMealButtonHandler = ()=>{
     setShowAddMealForm(true);
  }
  const hideAddMealForm = async()=>{
     await setShowAddMealForm(false);
     console.log(showAddMealForm);
  }
  return (
    <React.Fragment>
        <div className={classes.cartHolder} onClick={AddMealButtonHandler}>
          Add Meal to Menu
          {showAddMealForm && <Modal><MealsForm onClose={hideAddMealForm}/></Modal>}
        </div>
    </React.Fragment>
  );

}

export default MealAddButton;