import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔵 Checking token on page load:", token); // Debugging log

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.warn("⚠ Token expired. Logging out.");
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        setUser(decoded); // ✅ Restore user from token
        console.log("✅ Decoded user:", decoded); // Debugging log
      } catch (error) {
        console.error("❌ Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);


  const login = async (credentials, navigate) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      console.log("🔵 Raw Response from Server:", text); // Debugging log

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("❌ Invalid JSON response from server: " + text);
      }

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        setUser(jwtDecode(data.token)); // ✅ Set user in state
        navigate("/admin");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
