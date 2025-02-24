"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      router.push("/login"); // ✅ Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return null; // ✅ Prevent flicker

  return (
    <div className="flex-row items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard 🎉</h1>
      <button
        onClick={() => {
          localStorage.removeItem("auth-token");
          router.push("/login");
        }}
        className="mt-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}