"use client";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

// 🌟 Define Form Data Type
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

	// 🆕 New Fields for User Options
	weight: number;
	height: number;
	sex: string;
	priceRange: number;
	prepTime: number;

	// 🆕 New Fields for Customization
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
	mealScope: string;
};

// 🌟 Main Component
export default function DietOptionsPage() {
	const [activeTab, setActiveTab] = useState("user-options");

	// 🌟 State to store form data
	const [formData, setFormData] = useState<FormDataType>({
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

		// 🆕 Default values for User Options
		weight: 70, // Default weight in kg
		height: 175, // Default height in cm
		sex: "male", // Default selection
		priceRange: 30, // Default price range
		prepTime: 30, // Default meal prep time in minutes

		// 🆕 Default values for Customization
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
		mealScope: "One Meal", // Default selection
	});

	const tabs = [
		{ id: "user-options", label: "User Options" },
		{ id: "diet-options", label: "Diet Options" },
		{ id: "customization", label: "Customization" },
	];

	// 🌟 Handle tab switching
	const handleTabChange = (tab: string) => setActiveTab(tab);

	// 🌟 Handle input changes
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

	// 🌟 Handle multiple checkboxes (for Goals & Diets)
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

	// 🆕 Function to handle nutrient input changes
	const handleNutrientChange = (nutrient: string, value: number) => {
		setFormData((prev) => ({
			...prev,
			nutrients: { ...prev.nutrients, [nutrient]: value },
		}));
	};

	// 🌟 Handle form submission
	const handleSubmit = () => {
		console.log("Form Data:", formData); // Now includes all new fields!
		alert("Form data submitted! Check console for values.");
	};

	return (
		<div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6">
			{/* 🌟 Logo Placement */}
			<img src="/logo.png" alt="SmartServe Logo" className="w-16 h-16 absolute top-4 left-4" />



			{/* 🌟 Header */}
			<header className="w-full flex items-center justify-center px-6 lg:px-16 py-4">
				<h1 className="text-3xl lg:text-4xl font-extrabold text-center">
					SmartServe
				</h1>
			</header>

			<ThemeToggle />

			{/* 🌟 Main Layout */}
			<div className="container mx-auto flex flex-col lg:flex-row w-full space-y-6 lg:space-x-6 lg:space-y-0 items-start">
				{/* 🌟 Sidebar */}
				<div className="w-full lg:w-1/4 bg-dark dark:bg-primary p-6 rounded-3xl shadow-lg flex flex-col self-start">
					<div className="space-y-4">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								className={`w-full text-lg font-bold py-4 rounded-3xl transition shadow-lg ${
									activeTab === tab.id
										? "bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
										: "bg-dark text-primary dark:bg-primary dark:text-dark"
								}`}
								onClick={() => handleTabChange(tab.id)}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* 🌟 Submit Button */}
					<div className="mt-6">
						<button
							onClick={handleSubmit}
							className="w-full bg-accent-green text-dark py-4 rounded-3xl font-bold shadow-lg hover:scale-105 transition"
						>
							Generate
						</button>
					</div>
				</div>

				{/* 🌟 Form Section */}
				<div className="w-full lg:flex-grow bg-dark text-primary dark:bg-primary dark:text-dark p-8 rounded-3xl shadow-lg flex flex-col">
					<h2 className="text-3xl font-bold text-center mb-4">
						{activeTab.replace("-", " ")}
					</h2>
					<hr className="border-t border-gray-500 dark:border-gray-700 mb-6" />

					{/* 🌟 User Options */}
					{activeTab === "user-options" && (
						<div>
							<h3 className="text-2xl font-semibold mb-4">User Preferences</h3>

							{/* Display Name */}
							<label className="block text-lg font-bold">Display Name</label>
							<input
								type="text"
								name="displayName"
								value={formData.displayName}
								onChange={handleChange}
								className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
								placeholder="Enter your name..."
							/>

							{/* Physical Attributes */}
							<div className="grid grid-cols-2 gap-6 mt-4">
								<div>
									<label className="block text-lg font-bold">Weight (kg)</label>
									<input
										type="number"
										name="weight"
										value={formData.weight}
										onChange={handleChange}
										className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
									/>
								</div>
								<div>
									<label className="block text-lg font-bold">Height (cm)</label>
									<input
										type="number"
										name="height"
										value={formData.height}
										onChange={handleChange}
										className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
									/>
								</div>
							</div>

							{/* Sex Selection */}
							<label className="block text-lg font-bold mt-4">Sex</label>
							<select
								name="sex"
								value={formData.sex}
								onChange={handleChange}
								className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>

							{/* Price Range */}
							<label className="block text-lg font-bold mt-4">
								Price Range: ${formData.priceRange}
							</label>
							<input
								type="range"
								min="5"
								max="100"
								step="1"
								value={formData.priceRange}
								onChange={(e) =>
									setFormData({
										...formData,
										priceRange: parseInt(e.target.value),
									})
								}
								className="w-full cursor-pointer"
							/>

							{/* Meal Prep Time */}
							<label className="block text-lg font-bold mt-4">
								Meal Prep Time (minutes)
							</label>
							<input
								type="number"
								name="prepTime"
								value={formData.prepTime}
								onChange={handleChange}
								className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
								placeholder="Enter max time for meal prep"
							/>
						</div>
					)}

					{/* 🌟 Diet Options */}
					{activeTab === "diet-options" && (
						<div>
							<h3 className="text-2xl font-semibold">Select Your Diet</h3>
							<div className="grid grid-cols-2 gap-6">
								{[
									"Keto",
									"Paleo",
									"Mediterranean",
									"Intermittent Fasting",
									"DASH",
									"Vegan",
									"Vegetarian",
									"Pescatarian",
									"Gluten-free",
								].map((diet) => (
									<label key={diet} className="flex items-start space-x-3">
										<input
											type="checkbox"
											value={diet}
											checked={formData.selectedDiets.includes(diet)}
											onChange={(e) => handleCheckboxChange(e, "selectedDiets")}
											className="form-checkbox h-6 w-6 text-accent-green"
										/>
										<span className="font-bold">{diet}</span>
									</label>
								))}
							</div>

							{/* 🌟 Inclusions Section */}
							<div className="mt-6">
								<h3 className="text-2xl font-semibold">Inclusions</h3>
								<label className="block text-lg mt-2">
									Ingredients that you already own
								</label>
								<textarea
									name="inclusions"
									value={formData.inclusions}
									onChange={handleChange}
									className="w-full mt-2 p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
									placeholder="Enter a list of ingredients you have readily available:"
									rows={3}
								/>
							</div>

							{/* 🌟 Exclusions Section */}
							<div className="mt-6">
								<h3 className="text-2xl font-semibold">Exclusions</h3>
								<label className="block text-lg mt-2">Allergies</label>
								<textarea
									name="allergies"
									value={formData.allergies}
									onChange={handleChange}
									className="w-full mt-2 p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
									placeholder="Enter a list of allergies:"
									rows={3}
								/>
								<label className="block text-lg mt-4">
									Foods to avoid (excluding allergies)
								</label>
								<textarea
									name="exclusions"
									value={formData.exclusions}
									onChange={handleChange}
									className="w-full mt-2 p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
									placeholder="Enter a list of foods you do not want to eat:"
									rows={3}
								/>
							</div>
						</div>
					)}

					{/* 🌟 Customization */}
					{activeTab === "customization" && (
						<div>
							<h3 className="text-2xl font-semibold mb-4">
								Customize Your Meal Plan
							</h3>

							{/* Goal Selection */}
							<h4 className="text-lg font-bold">Goals</h4>
							<div className="grid grid-cols-2 gap-6">
								{[
									"Bulking",
									"Cutting",
									"Eating Healthy",
									"Expanding Palette",
								].map((goal) => (
									<label key={goal} className="flex items-center space-x-3">
										<input
											type="checkbox"
											value={goal}
											checked={formData.selectedGoals.includes(goal)}
											onChange={(e) => handleCheckboxChange(e, "selectedGoals")}
											className="form-checkbox h-5 w-5 text-accent-green"
										/>
										<span className="font-medium">{goal}</span>
									</label>
								))}
							</div>

							{/* Calorie Limit */}
							<label className="block text-lg font-bold mt-4">
								Calorie Limit: {formData.calorieLimit} kcal
							</label>
							<input
								type="range"
								min="1000"
								max="5000"
								step="100"
								value={formData.calorieLimit}
								onChange={(e) =>
									setFormData({
										...formData,
										calorieLimit: parseInt(e.target.value),
									})
								}
								className="w-full cursor-pointer"
							/>

							{/* Protein Requirement */}
							<label className="block text-lg font-bold mt-4">
								Protein Requirement (grams per day)
							</label>
							<input
								type="number"
								name="proteinRequirement"
								value={formData.proteinRequirement}
								onChange={handleChange}
								className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
							/>

							{/* Nutrient Management */}
							<h4 className="text-lg font-bold mt-4">Nutrient Management</h4>
							<div className="grid grid-cols-2 gap-6">
								{Object.keys(formData.nutrients).map((nutrient) => (
									<div key={nutrient}>
										<label className="block text-lg font-bold">
											{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}{" "}
											(mg)
										</label>
										<input
											type="number"
											value={
												formData.nutrients[
													nutrient as keyof typeof formData.nutrients
												]
											}
											onChange={(e) =>
												handleNutrientChange(
													nutrient as keyof typeof formData.nutrients,
													parseInt(e.target.value)
												)
											}
											className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
										/>
									</div>
								))}
							</div>

							{/* Meal Scope */}
							<h4 className="text-lg font-bold mt-4">Select Meal Scope</h4>
							<div className="grid grid-cols-3 gap-6">
								{["One Meal", "One Day", "One Week"].map((scope) => (
									<label key={scope} className="flex items-center space-x-3">
										<input
											type="radio"
											name="mealScope"
											value={scope}
											checked={formData.mealScope === scope}
											onChange={handleChange}
											className="form-radio h-5 w-5 text-accent-green"
										/>
										<span className="font-medium">{scope}</span>
									</label>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			{/* 🌟 Footer */}
<footer className="w-full bg-accent-gray text-white dark:bg-accent-beige dark:text-dark text-center text-sm py-4 mt-8 rounded-t-3xl">
Powered by Google Gemini

This project was developed by the SmartServe team. 

All rights reserved. © 2025 SmartServe.

The content, design, and functionality are the intellectual property of SmartServe and may not be reproduced without permission.

Google Gemini provides AI-powered assistance for generating insights, enhancing functionality, and improving user experience.
</footer>

		</div>
	);
}
