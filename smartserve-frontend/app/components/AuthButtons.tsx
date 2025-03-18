"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem("auth-token");
        setIsLoggedIn(!!storedUsername);
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("auth-token"); // Remove auth-token
        setIsLoggedIn(false);
        router.push("/home"); // Redirect to home page
    };

    // Handle Show Previous Meals
    const handleShowPreviousMeals = () => {
        router.push("/previous-meals"); // Redirect to the previous meals page
    };

    return (
        <div className="absolute top-4 right-16 flex items-right space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6">
            {!isLoggedIn ? (
                <button
                    onClick={() => router.push("/login")}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>
            ) : (
                <>
                    <button
                        onClick={handleShowPreviousMeals}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Previous Meals
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
