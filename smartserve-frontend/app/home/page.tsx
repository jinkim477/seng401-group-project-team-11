"use client";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import Image from "next/image";

export default function HomePage() {
	const router = useRouter();

	return (
		<div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-6 py-10">
			{/* Dark Mode Toggle */}
			<ThemeToggle />

			<div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between overflow-hidden">
				{/* Left Side - Hero Image (Partially Visible) */}
				<div className="absolute left-[-100px] lg:left-[-250px] top-[55%] transform -translate-y-1/2">
					<Image
						src="/logo.png"
						alt="SmartServe Logo"
						width={500}
						height={500}
						className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] object-cover"
						unoptimized={true}
					/>
				</div>

				{/* Right Side - Hero Text & Buttons */}
				<div className="lg:w-2/3 flex flex-col justify-center lg:items-start text-center lg:text-left space-y-12 pl-10 lg:pl-64 relative left-[-80px] lg:left-[-120px]">
					<h1 className="text-6xl lg:text-7xl font-extrabold leading-tight whitespace-nowrap relative left-[-80px] lg:left-[-125px]">
						Welcome to SmartServe
					</h1>

					<p className="text-3xl font-bold max-w-lg relative left-[80px] lg:left-[120px] mt-[-10px] lg:mt-[-15px]">
						Conquer your goals,
					</p>

					<p className="text-3xl font-bold max-w-lg relative left-[160px] lg:left-[200px] mt-[-20px] lg:mt-[-25px]">
						one meal at a time
					</p>

					{/* Buttons Section with Offset */}
					<div className="relative w-full max-w-md space-y-14 ml-16 mt-12">
						<button
							onClick={() => router.push("/login")}
							className="w-full max-w-lg bg-dark text-primary dark:bg-primary dark:text-dark py-5 rounded-full shadow-xl text-xl font-bold relative left-[120px] lg:left-[160px] hover:scale-105 transition"
						>
							Login
						</button>
						<button
							onClick={() => router.push("/register")}
							className="w-full max-w-lg bg-accent-gray text-primary dark:bg-accent-beige dark:text-dark py-5 rounded-full shadow-xl text-xl font-bold relative left-[140px] lg:left-[180px] hover:scale-105 transition"
						>
							Register
						</button>
						<button 
                            onClick={() => router.push("/dashboard")}
                            className="w-full max-w-lg bg-accent-green text-dark dark:bg-accent-green dark:text-dark py-5 rounded-full shadow-xl text-xl font-bold relative left-[120px] lg:left-[160px] hover:scale-105 transition">
							Continue as Guest
						</button>
					</div>
				</div>

				{/* Testimonials Section */}
				<div className="mt-20 w-full max-w-lg space-y-6 absolute right-[-50px] lg:right-[40px] top-[45%] transform -translate-y-1/2">
					{[
						{
							name: "Emily R.",
							text: "This app completely changed how I plan my meals! The personalized recipes are spot-on, and the clear instructions save me so much time. Highly recommend it!",
						},
						{
							name: "James L.",
							text: "I love how easy it is to find meals that fit my dietary preferences. The interface is clean, and the AI-generated meal plans are surprisingly accurate!",
						},
						{
							name: "Sophia M.",
							text: "Finally, an app that makes healthy eating simple and enjoyable. The detailed nutrition breakdown and step-by-step recipes are fantastic!",
						},
					].map((review, index) => (
						<div
							key={index}
							className="flex items-center bg-accent-beige dark:bg-accent-gray p-6 rounded-xl shadow-lg max-w-lg"
						>
							{/* Profile Placeholder */}
							<div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
								{review.name.charAt(0)} {/* First Letter of Name */}
							</div>

							{/* Review Content */}
							<div>
								<p className="italic text-lg leading-snug">
									&quot;{review.text}&quot;
								</p>
								<strong className="block mt-2 text-lg">- {review.name}</strong>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
