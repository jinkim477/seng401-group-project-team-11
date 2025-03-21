export type Meal = {
    name: string;
    price: string;
    ingredients?: string[];
    instructions?: string;
    prep_time?: string;
    macros?: {
        calories?: string;
        protein?: string;
        carbs?: string;
        fat?: string;
    };
};

export type Day = {
    [mealType: string]: Meal; // Meal types (e.g., breakfast, lunch, dinner)
};

export type MealPlan = {
    [dayKey: string]: Day; // Days (e.g., day1, day2)
};

// Define Form Data Type
export type FormDataType = {
    selectedDiets: string[];
    otherDiet: boolean;
    otherDietDetails: string;
    inclusions: string;
    allergies: string;
    exclusions: string;

    // New Fields for User Options
    weight: number;
    height: number;
    sex: string;
    priceRange: number;
    prepTime: number;
    cookTime: number;

    // New Fields for Customization
    selectedGoals: string[];
    calorieLimit: number;
    proteinRequirement: number;
    nutrients: {
        potassium: number;
        phosphorus: number;
        vitamins: number;
        calcium: number;
        sodium: number;
    };
    mealScope: MealScope;
};

export type DailyTotals = {
	calories: string;
	protein: string;
	potassium: string;
	phosphorus: string;
	vitamins: string;
	calcium: string;
	sodium: string;
};

export type ParsedResponse = {
    [dayKey: string]: {
        meals: {
            [mealType: string]: Meal;
        };
        daily_totals?: DailyTotals;
    };
};

export type MealPlanHistory = {
    id: string;
    createdTime: string;
    response: string;
};

export enum MealScope {
    OneDay = "One Day",
    ThreeDays = "Three Days",
    OneWeek = "One Week",
}