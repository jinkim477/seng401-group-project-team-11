"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import AuthButtons from "../components/AuthButtons";

const API_URL = "http://localhost:8080/gemini/history";

type Meal = {
	name: string;
	price: string;
	ingredients?: string[];
	instructions?: string;
	prep_time?: string;
	cook_time?: string;
	macros?: {
		calories?: string;
		protein?: string;
		carbs?: string;
		fat?: string;
	};
};

type DailyTotals = {
	calories: string;
	protein: string;
	potassium: string;
	phosphorus: string;
	vitamins: string;
	calcium: string;
	sodium: string;
};

type ParsedResponse = {
	[dayKey: string]: {
		[mealType: string]: Meal;
		daily_totals?: DailyTotals;
	};
};

type MealPlanHistory = {
	id: string;
	createdTime: string;
	response: string;
};

export default function MealHistoryPage() {
	const [mealHistory, setMealHistory] = useState<MealPlanHistory[]>([]);
	const [expandedMealPlanId, setExpandedMealPlanId] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchMealHistory = async () => {
			const userId = localStorage.getItem("userId");

			if (!userId) {
				setError("You must be logged in to view your meal history.");
				setLoading(false);
				return;
			}

			try {
				const response = await fetch(`${API_URL}?userId=${userId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch meal history.");
				}

				const data = await response.json();
				setMealHistory(data.length === 0 ? [] : data);
			} catch (error) {
				console.error("Error fetching meal history:", error);
				setError("An error occurred while fetching your meal history.");
			} finally {
				setLoading(false);
			}
		};

		fetchMealHistory();
	}, []);

	const toggleMealPlan = (mealPlanId: string) => {
		setExpandedMealPlanId(
			expandedMealPlanId === mealPlanId ? null : mealPlanId
		);
	};

	return (
		<div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6">
			{/* Logo Placement */}
			<div className="flex items-center justify-between w-full px-6 pt-2 pb-8">
				<LogoHeader />
			</div>

			{/* Main Layout */}
			<div className="container mx-auto flex flex-col lg:flex-row w-full space-y-6 lg:space-x-6 lg:space-y-0 items-start">
				{/* Meal History Section */}
				<div className="w-full lg:flex-grow bg-dark text-primary dark:bg-primary dark:text-dark p-8 rounded-3xl shadow-lg flex flex-col">
					<h2 className="text-3xl font-bold text-center mb-4">Meal History</h2>
					<hr className="border-t border-gray-500 dark:border-gray-700 mb-6" />

					{loading ? (
						<p className="text-center text-lg">Loading meal history...</p>
					) : error ? (
						<p className="text-center text-red-500">{error}</p>
					) : mealHistory.length === 0 ? (
						<p className="text-center text-lg text-primary dark:text-dark">
							You have no generated meal plans. Start creating one now! 🍽️
						</p>
					) : (
						<div className="space-y-6">
							{mealHistory.map((meal) => {
								const isExpanded = expandedMealPlanId === meal.id;
								let parsedResponse: ParsedResponse;
								try {
									parsedResponse = JSON.parse(meal.response) as ParsedResponse;
								} catch (error) {
									console.error("Error parsing meal response:", error);
									return null;
								}

								return (
									<div
										key={meal.id}
										className={`bg-primary dark:bg-dark text-dark dark:text-primary p-6 rounded-xl shadow-md ${
											!isExpanded ? "hover:scale-105 transition" : ""
										}`}
									>
										<h3
											className="text-lg font-semibold cursor-pointer flex items-center"
											onClick={() => toggleMealPlan(meal.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												className="stroke-dark dark:stroke-primary mr-2"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<circle cx="12" cy="12" r="10"></circle>
												<polyline points="12 6 12 12 16 14"></polyline>
											</svg>
											Generated on:{" "}
											{new Date(meal.createdTime).toLocaleString()}
										</h3>
										<div
                                            className={`transition-all duration-500 ease-in-out ${
                                                isExpanded ? "opacity-100" : "opacity-0"
                                            }`}
                                        >
											{isExpanded && (
												<>
													<hr className="my-4 border-gray-600" />

													{/* Loop through days (day1, day2, etc.) */}
													{Object.entries(parsedResponse).map(
														([dayKey, meals]) => (
															<div key={dayKey} className="mb-6">
																<h3 className="mt-2 mb-2 text-xl font-bold text-gray-700 dark:text-gray-300">
																	{dayKey.replace("day", "Day ")}
																</h3>

																{/* Loop through meals (breakfast, lunch, etc.) */}
																{Object.entries(meals).map(
																	([mealType, mealData]) => {
																		if (mealType === "daily_totals")
																			return null; // Skip daily_totals within meal rendering
																		return (
																			<div
																				key={mealType}
																				className="mb-6 p-4 rounded-lg bg-accent-green dark:bg-accent-green text-dark"
																			>
																				<h4 className="text-2xl font-bold capitalize">
																					🍽️ {mealType}
																				</h4>
																				<p className="font-semibold text-xl">
																					{mealData.name} - {mealData.price}
																				</p>
																				<p className="">
																					{mealData.instructions ||
																						"No instructions provided."}
																				</p>
																				<p className="font-semibold mt-2">
																					Prep Time:{" "}
																					<span className="font-normal">
																						{mealData.prep_time || "N/A"}
																					</span>
																				</p>

																				{/* Ingredients */}
																				{mealData.ingredients &&
																				mealData.ingredients.length > 0 ? (
																					<>
																						<h5 className="text-md font-semibold mt-2">
																							Ingredients:
																						</h5>
																						<ul className="list-disc pl-5 ">
																							{mealData.ingredients.map(
																								(ingredient, index) => (
																									<li key={index}>
																										{ingredient}
																									</li>
																								)
																							)}
																						</ul>
																					</>
																				) : (
																					<p className="text-sm text-dark">
																						No ingredients listed.
																					</p>
																				)}

																				{/* Macros */}
																				{mealData.macros ? (
																					<>
																						<h5 className="text-md font-semibold mt-2">
																							Macros:
																						</h5>
																						<ul className="list-disc pl-5">
																							<li>
																								Calories:{" "}
																								{mealData.macros.calories ||
																									"N/A"}
																							</li>
																							<li>
																								Protein:{" "}
																								{mealData.macros.protein ||
																									"N/A"}
																							</li>
																							<li>
																								Carbs:{" "}
																								{mealData.macros.carbs || "N/A"}
																							</li>
																							<li>
																								Fat:{" "}
																								{mealData.macros.fat || "N/A"}
																							</li>
																						</ul>
																					</>
																				) : (
																					<p className="text-sm text-gray-400">
																						No macros available.
																					</p>
																				)}
																			</div>
																		);
																	}
																)}

																{/* Display Daily Totals */}
																{meals.daily_totals && (
																	<div className="mt-6 p-4 border border-gray-500 dark:border-gray-100 rounded-lg bg-primary dark:bg-dark">
																		<h4 className="text-lg font-semibold">
																			📊 Daily Totals
																		</h4>
																		<ul className="list-disc pl-5 ">
																			{Object.entries(meals.daily_totals).map(
																				([key, value]) => (
																					<li key={key} className="capitalize">
																						{key}: {value}
																					</li>
																				)
																			)}
																		</ul>
																	</div>
																)}
															</div>
														)
													)}
												</>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}
