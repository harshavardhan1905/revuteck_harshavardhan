import React, { useState } from "react";
// import "./Login.css"; // Import the CSS file
import { FaUser, FaLock } from "react-icons/fa";
import Footer from "../pages/footer";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.username === "harsha" && data.password === "harsha123") {
            navigate('/admin-dashboard');
        } else {
            alert("Invalid credentials. Please try again.");
        } 
        console.log("Login Data:", data);
    };

    return (
        <>
            <div className="login-container">
                <div className="login-box">

                    <div className="login-title">
                        <h2>Admin Login</h2>
                        <a onClick={() => navigate('/')} className="home-link">
                             Home Page
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">

                        {/* Username */}
                        <div className="input-group full">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
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
