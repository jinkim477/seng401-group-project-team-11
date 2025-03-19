"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import LogoHeader from "../components/LogoHeader";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, email, password }),
			});

			if (!res.ok) {
				throw new Error("Registration failed.");
			}

			router.push("/login"); // Redirect to login page after successful signup
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
				<div className="w-full max-w-md p-6 bg-dark text-primary dark:bg-primary dark:text-dark rounded-3xl shadow-lg">
					<h2 className="text-3xl font-bold text-center mb-4">Register</h2>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<form onSubmit={handleRegister} className="space-y-4">
						<input
							type="text"
							placeholder="Username"
							className="w-full p-2 border rounded-lg bg-accent-gray dark:bg-accent-beige text-primary dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							className="w-full p-2 border rounded-lg bg-accent-gray dark:bg-accent-beige text-primary dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							className="w-full p-2 bg-accent-green text-dark rounded-lg hover:bg-green-600 transition"
						>
							Register
						</button>
					</form>
					<div>
						<p className="text-center mt-4">
							Already registered?{" "}
							<a
								href="/login"
								className="text-accent-green dark:text-green-800 hover:underline"
							>
								Login here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
