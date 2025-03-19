"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import LogoHeader from "../components/LogoHeader";

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check login status on mount
	useEffect(() => {
		const token = localStorage.getItem("auth-token");
		if (token) {
			setIsLoggedIn(true);
			router.push("/dashboard"); // Redirect if already logged in
		}
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Clear previous errors

		try {
			const res = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (!res.ok) {
				throw new Error("An error occurred. Please try again.");
			}

			const responseData = await res.json();
			console.log("Response from backend:", responseData);

			if (!responseData.id) {
				throw new Error("Login Failed. No user ID received.");
			}

			// Store username instead of token
			localStorage.setItem("auth-token", username);
			localStorage.setItem("userId", responseData.id);
			setIsLoggedIn(true);

			router.push("/dashboard"); // Redirect after successful login
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6">
			{/* Logo Placement */}
			<div className="flex items-center justify-between w-full px-6 pt-2 pb-8">
				<LogoHeader />
			</div>
			<div className="w-full flex flex-col justify-center items-center bg-primary text-dark dark:bg-dark dark:text-primary mt-16">
				<h2 className="text-2xl font-bold text-center mb-4">
					Welcome to SmartServe
				</h2>

				<div className="w-full max-w-md p-6 bg-dark text-primary dark:bg-primary dark:text-dark rounded-3xl shadow-lg">
					{isLoggedIn ? (
						<p className="text-green-500 text-lg text-center">
							You are already logged in.
						</p>
					) : (
						<>
							<h2 className="text-2xl font-bold text-center mb-4">Login</h2>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<form onSubmit={handleLogin} className="space-y-4">
								<input
									type="text"
									placeholder="Username"
									className="w-full p-2 border rounded-lg bg-accent-gray dark:bg-accent-beige text-primary dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
								<input
									type="password"
									placeholder="Password"
									className="w-full p-2 border rounded-lg bg-accent-gray dark:bg-accent-beige text-primary dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<button
									type="submit"
									className="w-full p-2 bg-accent-green text-dark  rounded-lg hover:bg-green-600 transition"
								>
									Login
								</button>
							</form>
							<div>
								<p className="text-center mt-4">
									Don&apos;t have an account?{" "}
									<a
										href="/register"
										className="text-accent-green dark:text-green-800 hover:underline"
									>
										Register here
									</a>
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
