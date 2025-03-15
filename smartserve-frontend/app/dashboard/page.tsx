"use client";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function DietOptionsPage() {
	const [activeTab, setActiveTab] = useState("user-options");

	const tabs = [
		{ id: "user-options", label: "User Options" },
		{ id: "diet-options", label: "Diet Options" },
		{ id: "customization", label: "Customization" },
	];

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6">
			{/* Header Section */}
			<header className="w-full flex items-center justify-center px-6 lg:px-16 py-4">
				{/* Left: Logo */}
				<img
					src="/logo.png"
					alt="SmartServe Logo"
					className="w-12 h-12 absolute left-6 lg:left-16"
				/>

				{/* Center: Title */}
				<h1 className="text-3xl lg:text-4xl font-extrabold text-center">
					SmartServe
				</h1>
			</header>

			{/* Dark Mode Toggle */}
			<ThemeToggle />

			{/* Main Layout */}
			<div className="container mx-auto flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0">
				{/* Left Sidebar (Tabs) - Full Width on Mobile */}
				<div className="w-full lg:w-1/4 bg-accent-beige dark:bg-dark p-6 rounded-lg shadow-lg">
					{/* Tab Buttons (Better Mobile Spacing) */}
					<div className="space-y-4">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								className={`w-full text-lg font-bold py-4 rounded-lg transition ${
									activeTab === tab.id
										? "bg-dark text-primary dark:bg-primary dark:text-dark"
										: "bg-gray-700 text-white dark:bg-gray-500 dark:text-dark"
								}`}
								onClick={() => handleTabChange(tab.id)}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Generate Button - Extra Margin for Mobile */}
					<button className="w-full mt-6 mb-6 bg-accent-green text-dark py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition">
						Generate
					</button>
				</div>

				{/* Right Side - Form Content (Full Width on Mobile) */}
				<div className="w-full lg:w-3/4 bg-dark text-primary dark:bg-gray-800 dark:text-primary p-6 rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold mb-4">Diet Options</h2>

					{/* Dynamic Tab Content */}
					{activeTab === "user-options" && (
						<div>
							<h3 className="text-2xl font-semibold">User Options</h3>
							<p className="text-lg mt-2">User-related settings go here.</p>
						</div>
					)}

					{activeTab === "diet-options" && (
						<div>
							<h3 className="text-2xl font-semibold">Select Your Diet</h3>
							<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="form-checkbox" />
									<span>Keto (Low-carb, high-fat)</span>
								</label>
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="form-checkbox" />
									<span>Mediterranean (Healthy fats, veggies)</span>
								</label>
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="form-checkbox" />
									<span>Vegetarian (No meat)</span>
								</label>
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="form-checkbox" />
									<span>Intermittent Fasting</span>
								</label>
							</div>
						</div>
					)}

					{activeTab === "customization" && (
						<div>
							<h3 className="text-2xl font-semibold">Customization</h3>
							<p className="text-lg mt-2">Add customization options here.</p>
						</div>
					)}

					{/* Previous / Next Navigation */}
					<div className="flex justify-between mt-8">
						<button
							className="text-lg font-bold px-4 py-2 bg-gray-600 text-white rounded-lg"
							onClick={() =>
								handleTabChange(
									tabs[
										Math.max(0, tabs.findIndex((t) => t.id === activeTab) - 1)
									].id
								)
							}
							disabled={activeTab === "user-options"}
						>
							← Prev
						</button>
						<button
							className="text-lg font-bold px-4 py-2 bg-gray-600 text-white rounded-lg"
							onClick={() =>
								handleTabChange(
									tabs[
										Math.min(
											tabs.length - 1,
											tabs.findIndex((t) => t.id === activeTab) + 1
										)
									].id
								)
							}
							disabled={activeTab === "customization"}
						>
							Next →
						</button>
					</div>
				</div>
			</div>

			{/* Footer */}
			<p className="text-center text-sm mt-6">
				Powered by Google Gemini <br />
				This project was developed by the [Your Team Name] team.
			</p>
		</div>
	);
}
