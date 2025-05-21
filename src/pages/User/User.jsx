import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel.jsx";
import UserPin from "../../components/UserPin.jsx";
import ErrorBoundary from "../../components/ErrorBoundary"; // Update this path

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function User() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log("Login successful:", userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    navigate("/home");
  };

  return (
    <div className="bg-[url('/images/background.png')] bg-no-repeat bg-cover flex flex-col min-h-screen items-center justify-around">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Carousel onSelectUser={setSelectedUser} />
        <UserPin 
          selectedUser={selectedUser}
          onLoginSuccess={handleLoginSuccess} 
        />
      </ErrorBoundary>
    </div>
  );
}

export default User;