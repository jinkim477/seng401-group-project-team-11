"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoHeader from "../components/LogoHeader";

export default function ResetPasswordPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");  // Clear previous errors
		setMessage("");

		try {
			const res = await fetch("https://seng401-group-project-team-11-production.up.railway.app/api/auth/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (!res.ok) {
				const errorData = await res.json(); // Assuming the backend sends JSON with an error description
				throw new Error(errorData.error || "Failed to send reset link. Please try again.");
			}

			const responseData = await res.json();
			setMessage("A password reset link has been sent to your email address.");
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
					Reset Your Password
				</h2>

				<div className="w-full max-w-md p-6 bg-dark text-primary dark:bg-primary dark:text-dark rounded-3xl shadow-lg">
					{message ? (
						<p className="text-green-500 text-lg text-center">
							{message}
						</p>
					) : (
						<>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<form onSubmit={handleResetPassword} className="space-y-4">
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full p-2 border rounded-lg bg-accent-gray dark:bg-accent-beige text-primary dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<button
									type="submit"
									className="w-full p-2 bg-accent-green text-dark rounded-lg hover:bg-green-600 transition"
								>
									Send Reset Link
								</button>
							</form>
						</>
					)}
					<div>
						<p className="text-center mt-4">
							Remembered your password?{" "}
							<a
								href="/login"
								className="text-accent-green dark:text-green-800 hover:underline"
							>
								Log in here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
