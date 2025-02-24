"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json"
        },
        body: JSON.stringify({ username, password }) 
      });
  
      // ✅ Read response text
      const responseText = await res.text();
      console.log("Response from backend:", responseText);
  
      // ✅ Explicitly check if response is "Invalid Credentials"
      if (responseText === "Invalid credentials") {
        throw new Error("Invalid username or password.");
      }
  
      // ✅ Store token only if it's not "Invalid Credentials"
      localStorage.setItem("auth-token", responseText);
  
      router.push("/dashboard"); // ✅ Redirect only if login is valid
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Welcome to SmartServe</h2>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}