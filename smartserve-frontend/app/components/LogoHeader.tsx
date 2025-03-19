"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import { usePathname } from "next/navigation";

const LogoHeader = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [guestMessage, setGuestMessage] = useState<string>("");
	const pathname = usePathname(); // Get current page path

	useEffect(() => {
		const storedUsername = localStorage.getItem("auth-token"); // Get stored username
		if (storedUsername) {
			setUsername(storedUsername);
		} else {
			// Pick a random message for guests
			const guestMessages = [
				"Feeling curious?",
				"Guest mode: ON!",
				"Exploring, huh?",
				"No login? No problem!",
				"Incognito foodie!",
				"Anonymous gourmet!",
				"Tasting the waters!",
				"Here for a bite?",
				"Cooking up ideas?",
				"SmartServe awaits!",
			];
			setGuestMessage(
				guestMessages[Math.floor(Math.random() * guestMessages.length)]
			);
		}
	}, []);

	return (
		<div className="w-full flex flex-col lg:flex-row items-center justify-between">
			<header className="w-full flex flex-col lg:flex-row items-center justify-between px-0 lg:px-0 py-2 relative">
				{/* Logo on the Left */}
				<div className="mb-4 lg:mb-0">
					<a href="/home" className="">
						<img
							src="/logo.png"
							alt="SmartServe Logo"
							className="w-20 h-20 cursor-pointer"
						/>
					</a>
				</div>

				{/* Dynamic Welcome Message */}
				<div className="flex items-center justify-center mb-4 lg:mb-0">
					{pathname !== "/login" && pathname !== "/register" && (
						<h1 className="text-3xl lg:text-4xl font-extrabold text-center">
							{username ? `Welcome back, ${username}!` : guestMessage}
						</h1>
					)}
				</div>

				{/* Auth Buttons and Theme Toggle */}
				<div className="flex flex-row items-center space-y-0 lg:space-y-0 lg:space-x-4">
					{pathname !== "/login" && pathname !== "/register" && <AuthButtons />}

					<ThemeToggle />
				</div>
			</header>
		</div>
	);
};

export default LogoHeader;
