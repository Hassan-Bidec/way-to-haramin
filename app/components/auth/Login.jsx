"use client";
import React from "react";
import Link from "next/link";

export default function LoginFormStatic() {
  return (
    <section className="flex flex-col md:flex-row h-screen w-full">
      {/* 🔹 Left Side (Dark Green) */}
      <div className="md:w-1/2 bg-[#206D69] flex flex-col justify-center items-center text-white px-10 py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-100 text-center max-w-md leading-relaxed">
          Login to manage your account, check your bookings, and stay connected
          with your travel group.
        </p>
      </div>

      {/* 🔹 Right Side (Form Section) */}
      <div className="md:w-1/2 bg-white flex justify-center items-center px-6 md:px-12 py-10">
        <form className="w-full max-w-md space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value="demo@example.com"
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value="********"
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-[#206D69] hover:bg-[#175953] text-white rounded-md font-medium transition"
          >
            Sign In
          </button>

          {/* Links */}
          <p className="mt-4 text-center text-gray-700 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#206D69] font-medium hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="mt-1 text-center text-sm text-gray-500">
            By logging in, you agree to our{" "}
            <Link
              href="/"
              className="text-[#206D69] hover:text-[#175953] font-medium"
            >
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
