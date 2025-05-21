import React, { useState, useEffect } from "react";

const buttonPass = [
  { button: "1" },
  { button: "2" },
  { button: "3" },
  { button: "4" },
  { button: "5" },
  { button: "6" },
  { button: "7" },
  { button: "8" },
  { button: "9" },
  { button: "C" },
  { button: "0" },
  { icon: "/icons/delete.svg" },
];

function UserPin({ selectedUser, onLoginSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Reset PIN and error when selectedUser changes (after initialization)
  useEffect(() => {
    if (!isInitializing) {
      setPin("");
      setError("");
    }
  }, [selectedUser, isInitializing]);

  // Mark initialization as complete after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = (val) => {
    if (val === "C") {
      setPin("");
    } else if (val === "backspace") {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 8) {
      setPin((prev) => prev + val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !selectedUser || pin.length !== 8) return;

    setError("");
    setIsSubmitting(true);

    try {
      const payload = {
        names: selectedUser.names,
        pin: parseInt(pin, 10),
      };

      console.log("Submitting authentication:", payload);

      const response = await fetch("http://localhost:8000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Authentication response:", responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.error || "Authentication failed");
        } catch {
          throw new Error(response.statusText || "Authentication failed");
        }
      }

      const data = JSON.parse(responseText);
      if (!data?.user_profile) {
        throw new Error("Invalid response format");
      }

      onLoginSuccess(data.user_profile);
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "An unknown error occurred");
      setPin("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-90 p-4">
      <input
        className="w-full py-3 text-lg text-center text-white font-bold focus:outline-none bg-transparent border-b-2 border-white mb-6"
        type="password"
        placeholder="Enter your PIN"
        value={pin}
        readOnly
      />
      
      {/* Keypad */}
      <div className="grid gap-4 mt-4 grid-cols-3 grid-rows-4">
        {buttonPass.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={`border border-gray-300 rounded-full text-white text-3xl py-2 transition duration-200 flex items-center justify-center ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-white/5 backdrop-blur-sm hover:opacity-50 cursor-pointer"
            }`}
            onClick={() => {
              if (!isSubmitting) {
                if (item.button) {
                  handleButtonClick(item.button);
                } else if (item.icon) {
                  handleButtonClick("backspace");
                }
              }
            }}
            disabled={isSubmitting}
          >
            {item.button ? (
              item.button
            ) : item.icon ? (
              <img className="h-8 w-8" src={item.icon} alt="Backspace" />
            ) : null}
          </button>
        ))}
      </div>
      
      {/* Error message */}
      {error && (
        <div className="text-red-500 mt-4 text-center animate-pulse">
          {error}
        </div>
      )}
      
      {/* Submit button */}
      <button
        type="submit"
        className={`w-full mt-6 py-3 text-white font-bold rounded-full transition duration-200 ${
          isSubmitting || !selectedUser || pin.length !== 8
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isSubmitting || !selectedUser || pin.length !== 8}
      >
        {isSubmitting ? "Verifying..." : "Unlock"}
      </button>
    </form>
  );
}

export default UserPin;