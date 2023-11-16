"use client";

import React, {useState } from "react";
import { loginUser } from "@/services/login";
import { useRouter } from "next/navigation";
import { getSocket } from "@/services/getSocket";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        const socket = getSocket();
        socket.connect();
        socket.emit("login");
        router.push("/dashboard");
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {};

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <a
              href="#"
              onClick={handleForgotPassword}
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot password?
            </a>
          </div>
        </form>
        <div className="mt-4">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
          </span>
          <a href="/register" className="text-blue-500 hover:underline text-sm">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
