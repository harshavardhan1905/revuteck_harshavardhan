import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Footer from "../pages/footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    user_name: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Data:", data);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Backend:", result);

      if (!response.ok) {
        setError(result.message || "Login failed");
        return;
      }

      // Save JWT
      localStorage.setItem("token", result.token);

      // Save user data
      localStorage.setItem("user", JSON.stringify(result.user));
      console.log("Logged in User:", result.user);

      // Redirect to homepage/dashboard
      navigate("/user-dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">

          <div className="login-title">
            <h2 style={{"margin-right": "232px"}}>Login</h2>
            <a onClick={() => navigate('/admin-login')} className="admin-link">
              Admin Login
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="login-form">

            {/* Username */}
            <div className="input-group full">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="user_name"
                placeholder="Username"
                value={data.user_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group full">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Button */}
            <div className="btn-row">
              <button className="login-btn" type="submit">Login</button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
