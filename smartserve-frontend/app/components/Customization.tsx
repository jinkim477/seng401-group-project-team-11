"use client";
import React from "react";

enum MealScope {
	OneDay = "One Day",
	ThreeDays = "Three Days",
	OneWeek = "One Week",
}

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
interface CustomizationProps {
	formData: FormDataType;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	handleCheckboxChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		category: keyof FormDataType
	) => void;
	handleNutrientChange: (
		nutrient: keyof FormDataType["nutrients"],
		value: number
	) => void;
}

const CustomizationOptions: React.FC<CustomizationProps> = ({
	formData,
	handleChange,
	handleCheckboxChange,
	handleNutrientChange,
}) => {
	return (
		<div>
			<h3 className="text-2xl font-semibold mb-4">Customize Your Meal Plan</h3>

			{/* Goal Selection */}
			<h4 className="text-lg font-bold">Goals</h4>
			<div className="grid grid-cols-2 gap-6">
				{["Bulking", "Cutting", "Eating Healthy", "Expanding Palette"].map(
					(goal) => (
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
					)
				)}
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
					handleChange({
						...e,
						target: {
							...e.target,
							name: "calorieLimit",
							value: parseInt(e.target.value),
						},
					})
				}
				className="w-full cursor-pointer"
			/>

			{/* Protein Requirement */}
			<label className="block text-lg font-bold mt-4">
				Protein Requirement (25 to 500 grams per day) 
			</label>
			<input
				type="number"
				name="proteinRequirement"
				min="25"
        		max="500"
				value={formData.proteinRequirement}
				onChange={handleChange}
				className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
			/>

			{/* Nutrient Management */}
			<h4 className="text-lg font-bold mt-4">Nutrient Management </h4>
			<div className="grid grid-cols-2 gap-6">
				{Object.keys(formData.nutrients).map((nutrient) => (
					<div key={nutrient}>
						<label className="block text-lg font-bold">
							{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (0 to 10000 mg)
						</label>
						<input
							type="number"
							min="0"
        					max="10000"
							value={
								formData.nutrients[nutrient as keyof typeof formData.nutrients]
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
				{["One Day", "Three Days", "One Week"].map((scope) => (
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
	);
};

export default CustomizationOptions;
