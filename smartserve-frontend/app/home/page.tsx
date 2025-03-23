"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import Image from "next/image";

export default function HomePage() {
    const router = useRouter();
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

    return (
        <div className="relative min-h-screen bg-primary text-dark dark:bg-dark dark:text-primary flex flex-col items-center px-4 py-6 lg:px-8 lg:py-4 overflow-hidden">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center lg:text-left"
                >
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-tight lg:whitespace-nowrap">
                        Welcome to SmartServe
                    </h1>
                </motion.div>
                {/* Dark Mode Toggle */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="lg:mt-4 lg:mt-0 justify-end"
                >
                    <ThemeToggle />
                </motion.div>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between lg:justify-start lg:mt-16">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-1/3 flex flex-col lg:justify-center items-center lg:mt-12"
                >
                    <div className="relative absolute lg:left-[-200px] w-full max-w-md lg:max-w-lg xl:max-w-xl">
                        <Image
                            src="/logo.png"
                            alt="SmartServe Logo"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover lg:scale-150"
                            unoptimized={true}
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:h-full lg:w-1/4 flex flex-col mt-6 lg:mt-0 lg:space-y-24 justify-center items-center lg:items-start"
                >
                    <h2 className="text-3xl font-bold mb-4 text-center lg:text-left relative absolute lg:left-[-100px]">
                        <p className="relative absolute lg:left-[-50px]">
                            Conquer your goals,
                        </p>
                        <p>one meal at a time!</p>
                    </h2>

                    {isLoggedIn ? (
                        <div className="flex flex-col space-y-4 lg:space-y-16 w-full max-w-lg text-xl font-bold text-primary dark:text-dark mt-0 mb-0">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="bg-dark dark:bg-primary py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg relative absolute lg:left-[-25px]"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => router.push("/previous-meals")}
                                className="bg-accent-gray dark:bg-accent-beige py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg"
                            >
                                Previous Meal Plans
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-800 dark:bg-red-200 py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg relative absolute lg:left-[-25px]"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4 lg:space-y-16 w-full max-w-lg text-xl font-bold text-primary dark:text-dark mt-0 mb-0">
                            <button
                                onClick={() => router.push("/login")}
                                className="bg-dark dark:bg-primary py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg relative absolute lg:left-[-25px]"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/register")}
                                className="bg-accent-gray dark:bg-accent-beige py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="bg-accent-green text-dark dark:bg-accent-green py-5 rounded-full shadow-xl hover:scale-105 transition shadow-lg relative absolute lg:left-[-25px]"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    )}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:h-full lg:w-5/12 flex flex-col justify-end items-center lg:items-end mt-6 lg:mt-0"
                >
                    {[
                        {
                            name: "Emily R.",
                            text: "This app completely changed how I plan my meals! The personalized recipes are spot-on, and the clear instructions save me so much time. Highly recommend it!",
                            image:
                                "https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-young-adult-woman-headshot-portrait-on-white-view-png-image_10552273.png",
                        },
                        {
                            name: "James L.",
                            text: "I love how easy it is to find meals that fit my dietary preferences. The interface is clean, and the AI-generated meal plans are surprisingly accurate!",
                            image:
                                "https://www.theheadshotguy.co.uk/wp-content/uploads/2022/10/DDSS_JC_1205_1266-1024x819.png",
                        },
                        {
                            name: "Sophia M.",
                            text: "Finally, an app that makes healthy eating simple and enjoyable. The detailed nutrition breakdown and step-by-step recipes are fantastic!",
                            image:
                                "https://png.pngtree.com/png-vector/20230929/ourmid/pngtree-beautiful-young-woman-headshot-8-glamorous-png-image_10047502.png",
                        },
                    ].map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="flex items-center bg-accent-beige dark:bg-accent-gray p-6 rounded-xl shadow-lg max-w-lg mb-4"
                        >
                            {/* Profile Image */}
                            {review.image ? (
                                <Image
                                    src={review.image}
                                	alt={review.name}
                                    width={80}
                                    height={80}
                                    className="w-32 h-32 rounded-xl object-cover mr-4"
                                />
                            ) : (
                                /* Placeholder Avatar */
                                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    {review.name.charAt(0)}
                                </div>
                            )}

                            {/* Review Content */}
                            <div>
                                <p className="italic text-lg leading-snug">
                                    &quot;{review.text}&quot;
                                </p>
                                <strong className="block mt-2 text-lg">- {review.name}</strong>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}