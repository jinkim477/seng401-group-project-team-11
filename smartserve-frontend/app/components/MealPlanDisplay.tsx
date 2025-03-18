import React from 'react';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ mealPlan }) => {
  return (
    <div className="mt-8 p-6 bg-accent-gray dark:bg-accent-beige rounded-3xl shadow-lg text-primary dark:text-dark text-center">
      <h3 className="text-3xl tracking-widest font-bold">Generated Meal Plan</h3>
      <div className="mt-4 p-4 bg-dark text-primary dark:bg-primary dark:text-dark rounded-lg">
        {Object.keys(mealPlan).map((dayKey, dayIndex) => {
          const day = mealPlan[dayKey] as Day;

          return (
            <div key={dayIndex} className="mb-6">
              <h3 className="text-2xl font-semibold">Day {dayIndex + 1}</h3>

              {Object.keys(day).map((mealType, mealIndex) => {
                const meal = day[mealType] as Meal;

                if (!meal || !meal.ingredients) {
                  return null;
                }

                return (
                  <div
                    key={mealIndex}
                    className="mt-4 p-4 bg-accent-green rounded-lg text-left text-dark"
                  >
                    <h4 className="text-2xl font-bold capitalize">
                      {mealType}: {meal.name}
                    </h4>

                    <h5 className="mt-2 font-semibold">Ingredients:</h5>
                    <ul className="list-disc list-inside ml-4">
                      {meal.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>

                    <p className="mt-2">
                      <strong>Instructions:</strong> {meal.instructions}
                    </p>

                    <p className="mt-2">
                      <strong>Prep Time:</strong> {meal.prep_time}
                    </p>
                    
                    <p className='mt-2'>
                      <strong>Cook Time:</strong> {meal.cook_time}
                    </p>

                    <h5 className="mt-3 font-semibold">Macros:</h5>
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        <strong>Calories:</strong> {meal.macros.calories}
                      </li>
                      <li>
                        <strong>Protein:</strong> {meal.macros.protein}
                      </li>
                      <li>
                        <strong>Carbs:</strong> {meal.macros.carbs}
                      </li>
                      <li>
                        <strong>Fat:</strong> {meal.macros.fat}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanDisplay;