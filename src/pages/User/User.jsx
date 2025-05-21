import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel.jsx";
import UserPin from "../../components/UserPin.jsx";

function User() {
  // Store all user profiles fetched from the backend
  const [profiles, setProfiles] = useState([]);
  // Optionally store the logged-in user's info
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch profiles from your API when component mounts
  useEffect(() => {
    fetch("/api/user_list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profiles");
        }
        return res.json();
      })
      .then((data) => {
        // Here, data should be an array of user profiles from your UserProfileSerializer
        setProfiles(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // Callback to handle a successful login
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    // Optionally, you might refresh profiles here too:
    // setProfiles((prev) => [...prev, userData]);  
  };

  return (
    <div className="bg-[url('/images/background.png')] bg-no-repeat bg-cover flex flex-col min-h-screen items-center justify-around">
      {/* Pass the profiles loaded from backend to the Carousel */}
      <Carousel profiles={profiles} />
      {/* Provide the login success callback to the UserPin component */}
      <UserPin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default User;
