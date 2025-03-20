"use client";
import { useState } from "react";
import LogoHeader from "../components/LogoHeader";
import Sidebar from "../components/Sidebar";
import UserOptions from "../components/UserOptions";
import DietOptions from "../components/DietOptions";
import Customization from "../components/Customization";
import MealPlanDisplay from "../components/MealPlanDisplay";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";

const RU_API_URL = "https://seng401-group-project-team-11-production.up.railway.app/gemini/generate";
const G_API_URL = "https://seng401-group-project-team-11-production.up.railway.app/gemini/guest/generate";

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
	const [activeTab, setActiveTab] = useState("User-Options");
	const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
	const [loading, setLoading] = useState(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]); // For Error message when data is not within the range

	// State to store form data
	const [formData, setFormData] = useState<FormDataType>(initialFormData);

	const tabs = [
		{ id: "User-Options", label: "User Options" },
		{ id: "Diet-Options", label: "Diet Options" },
		{ id: "Customization", label: "Customization" },
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

	const handleCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		category: keyof FormDataType
	) => {
		const { value, checked } = e.target;

		setFormData((prev) => {
			let updatedGoals = [...(prev[category] as string[])];

			if (checked) {
				// Prevent selecting both "Bulking" and "Cutting" at the same time
				if (value === "Bulking") {
					updatedGoals = updatedGoals.filter((goal) => goal !== "Cutting");
				} else if (value === "Cutting") {
					updatedGoals = updatedGoals.filter((goal) => goal !== "Bulking");
				}

				updatedGoals.push(value);
			} else {
				updatedGoals = updatedGoals.filter((goal) => goal !== value);
			}

			return {
				...prev,
				[category]: updatedGoals,
			};
		});
	};

	// Function to handle nutrient input changes
	const handleNutrientChange = (nutrient: string, value: number) => {
		setFormData((prev) => ({
			...prev,
			nutrients: { ...prev.nutrients, [nutrient]: value },
		}));
	};

	function validateFormData(data: FormDataType): string[] {
		const errors: string[] = [];

		if (data.weight < 15 || data.weight > 300) {
			errors.push("Weight must be between 15 and 300 kg.");
		}
		if (data.height < 30 || data.height > 300) {
			errors.push("Height must be between 30 and 300 cm.");
		}
		if (data.prepTime < 1 || data.prepTime > 60) {
			errors.push("Prep time must be between 1 and 60 minutes.");
		}
		if (data.cookTime < 1 || data.cookTime > 180) {
			errors.push("Cook time must be between 1 and 180 minutes.");
		}
		if (data.priceRange < 5 || data.priceRange > 100) {
			errors.push("Price range must be between 5 and 100.");
		}
		if (data.calorieLimit < 1000 || data.calorieLimit > 5000) {
			errors.push("Calorie limit must be between 1000 and 5000.");
		}
		if (data.proteinRequirement < 25 || data.proteinRequirement > 500) {
			errors.push("Protein requirement must be between 25 and 500 grams.");
		}
		if (data.nutrients.potassium < 0 || data.nutrients.potassium > 10000) {
			errors.push("Potassium must be between 0 and 10000 mg.");
		}
		if (data.nutrients.phosphorus < 0 || data.nutrients.phosphorus > 10000) {
			errors.push("Phosphorus must be between 0 and 10000 mg.");
		}
		if (data.nutrients.vitamins < 0 || data.nutrients.vitamins > 10000) {
			errors.push("Vitamins must be between 0 and 10000 mg.");
		}
		if (data.nutrients.calcium < 0 || data.nutrients.calcium > 10000) {
			errors.push("Calcium must be between 0 and 10000 mg.");
		}
		if (data.nutrients.sodium < 0 || data.nutrients.sodium > 10000) {
			errors.push("Sodium must be between 0 and 10000 mg.");
		}

		return errors;
	}

	const handleSubmit = async () => {
		const userId = localStorage.getItem("userId");
		const isGuest = !userId;
		// Ensure required fields are selected
		if (!formData.mealScope) {
			alert("Please select a meal scope (One Day, Three Days, One Week).");
			return;
		}

		const errors = validateFormData(formData);
		if (errors.length > 0) {
			setErrorMessages(errors);
			return;
		}
		setErrorMessages([]);
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
			const url = isGuest ? G_API_URL : `${RU_API_URL}?userId=${userId}`;

			const response = await fetch(url, {
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
			<div className="flex items-center justify-between w-11/12 px-6 pt-2 pb-8">
				<LogoHeader />
			</div>
			{/* Main Layout */}
			<div className="container mx-auto flex flex-col lg:flex-row w-full space-y-6 lg:space-x-6 lg:space-y-0 items-start">
				{/* Sidebar */}
				<Sidebar
					tabs={tabs}
					activeTab={activeTab}
					handleTabChange={handleTabChange}
					handleSubmit={handleSubmit}
					loading={loading}
					errorMessages={errorMessages} // Passing error messages to Sidebar
				/>

				{/* Form Section */}
				<div className="w-full lg:flex-grow bg-dark text-primary dark:bg-primary dark:text-dark p-8 rounded-3xl shadow-lg flex flex-col">
					<h2 className="text-3xl font-bold text-center mb-4">
						{activeTab.replace("-", " ")}
					</h2>
					<hr className="border-t border-gray-500 dark:border-gray-700 mb-6" />
					<form onSubmit={handleSubmit}>
						{/* User Options */}
						{activeTab === "User-Options" && (
							<UserOptions
								formData={formData}
								handleChange={handleChange}
								handleCheckboxChange={handleCheckboxChange}
							/>
						)}

						{/* Diet Options */}
						{activeTab === "Diet-Options" && (
							<DietOptions
								formData={formData}
								handleChange={handleChange}
								handleCheckboxChange={handleCheckboxChange}
							/>
						)}

						{/* Customization */}
						{activeTab === "Customization" && (
							<Customization
								formData={formData}
								handleChange={handleChange}
								handleCheckboxChange={handleCheckboxChange}
								handleNutrientChange={handleNutrientChange}
							/>
						)}
					</form>
				</div>
			</div>

			{mealPlan && <MealPlanDisplay mealPlan={mealPlan} />}

			{/* About Us */}
			<AboutUs />
			{/* Contact */}
			<Contact />
			{/* Footer */}
			<Footer />
		</div>
	);
}
