"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Use usePathname to detect current page

const AuthButtons = () => {
	const router = useRouter();
	const pathname = usePathname(); // Get current page path
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUsername = localStorage.getItem("auth-token");
		setIsLoggedIn(!!storedUsername);
	}, []);

	// Handle Logout
	const handleLogout = () => {
		localStorage.removeItem("auth-token"); // Remove auth-token
		localStorage.removeItem("userId"); // Remove userId
		setIsLoggedIn(false);
		router.push("/home"); // Redirect to home page
	};

	// Handle navigation
	const handleNavigate = (path: string) => {
		router.push(path);
	};

	return (
		<div className="absolute top-4 right-16 flex items-right space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6">
			{!isLoggedIn ? (
				<button
					onClick={() => handleNavigate("/login")}
					className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
				>
					Login
				</button>
			) : (
				<>
					{pathname === "/dashboard" ? (
						<button
							onClick={() => handleNavigate("/previous-meals")}
							className="px-3 py-1 sm:px-4 sm:py-2 bg-accent-green text-dark rounded-lg hover:bg-green-500 transition flex items-center space-x-2 shadow-md hover:shadow-lg hover:scale-110"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#494949"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							<span>Previous Meals</span>
						</button>
					) : pathname === "/previous-meals" ? (
						<button
							onClick={() => handleNavigate("/dashboard")}
							className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-dark rounded-lg hover:bg-green-600 transition shadow-md hover:shadow-lg hover:scale-110"
						>
							⬅️ Return to Dashboard
						</button>
					) : null}

					<button
						onClick={handleLogout}
						className="px-3 py-1 sm:px-4 sm:py-2 bg-dark dark:bg-primary text-primary dark:text-dark rounded-lg hover:bg-red-950 dark:hover:bg-red-200 transition flex items-center space-x-2 shadow-md hover:shadow-lg hover:scale-110"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							className="stroke-primary dark:stroke-dark"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
						</svg>
						<span>Logout</span>
					</button>
				</>
			)}
		</div>
	);
};

export default AuthButtons;
