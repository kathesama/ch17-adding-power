/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import React, { useEffect, useState } from 'react';
import cssStyle from './MealsAvailable.module.css';
import Card from '../../UI/Card/Card';
import MealItem from '../Items/MealItem';
import useFetchHttp from '../../../hooks/use-fetch-http/use-fetch-http';

const MealsAvailable = () => {
  const { isLoading, error, sendRequest: fetchMeals } = useFetchHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals({ url: 'https://react-api-k-default-rtdb.firebaseio.com/meals.json' }, transformMeals);
  }, [fetchMeals]);

  let content = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}>
      {meal.name}
    </MealItem>
  ));

  if (error) {
    // eslint-disable-next-line react/button-has-type
    content = <button onClick={fetchMeals}>Error... try again</button>;
  }

  if (isLoading) {
    content = 'Loading tasks...';
  }

  return (
    <section className={cssStyle.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
