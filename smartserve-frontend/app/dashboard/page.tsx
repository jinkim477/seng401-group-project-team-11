"use client";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import LogoHeader from "../components/LogoHeader";
import Sidebar from "../components/Sidebar";
import UserOptions from "../components/UserOptions";
import DietOptions from "../components/DietOptions";
import Customization from "../components/Customization";
import MealPlanDisplay from "../components/MealPlanDisplay";
import Footer from "../components/Footer";
import AuthButtons from "../components/AuthButtons"; //

const API_URL = "http://localhost:8080/gemini/generate";

type Meal = {
    name: string;
    price: string;
    ingredients: string[];
    instructions: string;
    prep_time: string;
    macros: {
        calories: string;
        protein: string;
        carbs: string;
        fat: string;
    };
};

type Day = {
    [mealType: string]: Meal; // Meal types (e.g., breakfast, lunch, dinner)
};

type MealPlan = {
    [dayKey: string]: Day; // Days (e.g., day1, day2)
};

// Define Form Data Type
type FormDataType = {
    displayName: string;
    mealTimes: string[];
    dietaryGoal: string;
    activityLevel: string;
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

enum MealScope {
    OneDay = "One Day",
    ThreeDays = "Three Days",
    OneWeek = "One Week",
}

const initialFormData: FormDataType = {
    displayName: "",
    mealTimes: [],
    dietaryGoal: "",
    activityLevel: "",
    selectedDiets: [],
    otherDiet: false,
    otherDietDetails: "",
    inclusions: "",
    allergies: "",
    exclusions: "",

    // Default values for User Options
    weight: 70, // Default weight in kg
    height: 175, // Default height in cm
    sex: "male", // Default selection
    priceRange: 30, // Default price range
    prepTime: 30, // Default meal prep time in minutes
    cookTime: 60, // Default meal cook time in minutes

    // Default values for Customization
    selectedGoals: [],
    calorieLimit: 2000, // Default calorie intake
    proteinRequirement: 100, // Default protein intake (grams)
    nutrients: {
        potassium: 3500,
        phosphorus: 700,
        vitamins: 100, // Adjust as needed
        calcium: 1000,
        sodium: 2300,
    },
    mealScope: MealScope.OneDay, // Default selection
};

// Main Component
export default function DietOptionsPage() {
    const [activeTab, setActiveTab] = useState("user-options");
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [loading, setLoading] = useState(false);

    // State to store form data
    const [formData, setFormData] = useState<FormDataType>(initialFormData);

    const tabs = [
        { id: "user-options", label: "User Options" },
        { id: "diet-options", label: "Diet Options" },
        { id: "customization", label: "Customization" },
    ];

    // Handle tab switching
    const handleTabChange = (tab: string) => setActiveTab(tab);

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                    ? parseInt(value)
                    : value,
        }));
    };

    // Handle multiple checkboxes (for Goals & Diets)
    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        category: keyof FormDataType
    ) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [category]: checked
                ? [...(prev[category] as string[]), value]
                : (prev[category] as string[]).filter((item) => item !== value),
        }));
    };

    // Function to handle nutrient input changes
    const handleNutrientChange = (nutrient: string, value: number) => {
        setFormData((prev) => ({
            ...prev,
            nutrients: { ...prev.nutrients, [nutrient]: value },
        }));
    };

    const handleSubmit = async () => {
        // Ensure required fields are selected
        if (!formData.mealScope) {
            alert("Please select a meal scope (One Day, Three Days, One Week).");
            return;
        }

        // Build the API request payload with all form options
        const requestBody = {
            ...formData,
            days:
                formData.mealScope === MealScope.OneWeek
                    ? 7
                    : formData.mealScope === MealScope.ThreeDays
                    ? 3
                    : 1, // Default: 1 day
        };

        console.log("Sending request:", requestBody);
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);
            setMealPlan(data); // Store response in state
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while generating the meal plan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6">
            {/* Logo Placement */}
            <LogoHeader />

            <AuthButtons />

            <ThemeToggle />

            {/* Main Layout */}
            <div className="container mx-auto flex flex-col lg:flex-row w-full space-y-6 lg:space-x-6 lg:space-y-0 items-start">
                {/* Sidebar */}
                <Sidebar
                    tabs={tabs}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />

                {/* Form Section */}
                <div className="w-full lg:flex-grow bg-dark text-primary dark:bg-primary dark:text-dark p-8 rounded-3xl shadow-lg flex flex-col shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        {activeTab.replace("-", " ")}
                    </h2>
                    <hr className="border-t border-gray-500 dark:border-gray-700 mb-6" />

                    {/* User Options */}
                    {activeTab === "user-options" && (
                        <UserOptions
                            formData={formData}
                            handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    )}

                    {/* Diet Options */}
                    {activeTab === "diet-options" && (
                        <DietOptions
                            formData={formData}
                            handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    )}

                    {/* Customization */}
                    {activeTab === "customization" && (
                        <Customization
                            formData={formData}
                            handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleNutrientChange={handleNutrientChange}
                        />
                    )}
                </div>
            </div>

            {mealPlan && <MealPlanDisplay mealPlan={mealPlan} />}

            {/* Footer */}
            <Footer />
        </div>
    );
}