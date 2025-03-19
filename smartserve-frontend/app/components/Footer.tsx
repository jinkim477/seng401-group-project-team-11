"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const Footer: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const DEL_API_URL = "http://localhost:8080/api/auth/delete";
	const router = useRouter();

	useEffect(() => {
		const storedUsername = localStorage.getItem("auth-token");
		setIsLoggedIn(!!storedUsername);
	}, []);

	// Handle Logout
	const handleDelete = async () => {
		const userId = localStorage.getItem("userId");

		try {
			const response = await fetch(`${DEL_API_URL}?userId=${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete user.");
			}
		} catch (error) {
			console.error("Error delete user:", error);
			// setError("An error occurred while fetching your meal history.");
		}

		localStorage.removeItem("auth-token"); // Remove auth-token
		localStorage.removeItem("userId"); // Remove userId
		setIsLoggedIn(false);
		router.push("/home"); // Redirect to home page
	};

	return (
		<footer className="w-11/12">
			{/* copyright and property notice */}
			<div className="bg-dark text-white dark:bg-primary dark:text-dark text-center text-sm py-2 mt-4 rounded-3xl shadow-sm">
				<div className="px-2">
					<p>© {new Date().getFullYear()} SmartServe. All rights reserved.</p>
					Powered by Google Gemini This project was developed by the SmartServe
					team. The content, design, and functionality are the intellectual
					property of SmartServe and may not be reproduced without permission.
					Google Gemini provides AI-powered assistance for generating insights,
					enhancing functionality, and improving user experience.
				</div>
			</div>
			<div className="flex justify-center mt-4">
				{isLoggedIn ? (
					<button
						onClick={handleDelete}
						className="px-3 py-1 sm:px-4 sm:py-2 bg-red-700 text-primary rounded-lg hover:bg-red-500 transition flex items-center space-x-2 shadow-md hover:shadow-lg hover:scale-110"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="stroke-primary"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
							<line x1="10" y1="11" x2="10" y2="17"></line>
							<line x1="14" y1="11" x2="14" y2="17"></line>
						</svg>
						<span>DELETE ACCOUNT</span>
					</button>
				) : null}
			</div>
		</footer>
	);
};

export default Footer;
