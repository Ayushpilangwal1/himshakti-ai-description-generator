"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input, Button, useToast } from "@/components/ui";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    // Keep email/password but clear specific fields
    setConfirmPassword("");
    if (mode === "login") {
      setFullName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    
    if (mode === "signup" && !fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (mode === "signup") {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        message: mode === "login" 
          ? "Login functionality coming soon! Stay tuned. 🚀"
          : "Account creation coming soon! Stay tuned. 🚀",
        type: "success",
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {mode === "login" ? "🔐 Login" : "✨ Create Account"}
          </h1>
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400 text-sm">
            {mode === "login" 
              ? "Sign in to your HimShakti AI account"
              : "Join HimShakti AI to generate product listings"}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white dark:bg-brand-dark-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            {mode === "signup" && (
              <Input
                label="Full Name"
                type="text"
                id="fullName"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                error={errors.fullName}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
            />

            {mode === "signup" && (
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                error={errors.confirmPassword}
              />
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-brand-green font-medium cursor-pointer hover:underline focus:outline-none"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
