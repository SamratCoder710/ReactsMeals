import React from "react";
import TaglineBanner from "../UI/TaglineBanner";
import AvailableMeals from "./AvailableMeals";

const Meals = () =>{
    return (
        <React.Fragment>
            <TaglineBanner/>
            <AvailableMeals/>
        </React.Fragment>
    );
}

export default Meals;