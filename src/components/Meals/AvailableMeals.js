import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "../Meals/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const data = async () => {
      setIsLoading(true);
      const loadedResult = await fetch(
        "https://react-http-b06ae-default-rtdb.firebaseio.com/meals.json"
      );
      if (!loadedResult.ok) {
        setHttpError(loadedResult.statusText);
      }
      const output = await loadedResult.json();
      if (httpError) {
        throw new Error("Something went wrong...");
      }
      const dummy = [];
      for (let key in output) {
        dummy.push({
          id: key,
          name: output[key].name,
          description: output[key].description,
          price: output[key].price,
        });
      }

      setMeals(dummy);
      setIsLoading(false);
    };

    data().catch((e) => {
      setIsLoading(false);
      setHttpError(e.message);
    });
  }, [httpError]);
  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
