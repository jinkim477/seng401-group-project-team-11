"use client";

import React, { useEffect, useState } from "react";

const LogoHeader = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [guestMessage, setGuestMessage] = useState<string>("");

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
			setGuestMessage(guestMessages[Math.floor(Math.random() * guestMessages.length)]);
		}
	}, []);

	return (
		<header className="w-full flex items-center justify-between px-6 lg:px-16 py-2 relative">
			{/* Logo on the Left */}
			<img
				src="/logo.png"
				alt="SmartServe Logo"
				className="w-20 h-20 absolute left-4"
			/>

			{/* Dynamic Welcome Message */}
			<div className="flex-grow flex justify-center">
				<h1 className="text-3xl lg:text-4xl font-extrabold text-center">
					{username ? `Welcome back, ${username}!` : guestMessage}
				</h1>
			</div>
		</header>
	);
};

export default LogoHeader;
