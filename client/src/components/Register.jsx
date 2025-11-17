import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import "../assets/css/styles.css";
import Footer from "../pages/footer";
import { useNavigate } from "react-router-dom"; 

export default function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    user_name: "",
    role: "",
    password: "",
    newPassword: "",
    phone: "",
    address: "",
    department: "",
    status: "active",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Posting 
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending:", formData);

    const response = await fetch("https://revuteck-harshavardhan.onrender.com/api/register/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if(response.ok){
      alert("Registration Successful!");
      setFormData({
      fullName: "",
      email: "",
      user_name: "",
      role: "",
      password: "",
      newPassword: "",
      phone: "",
      address: "",
      department: "",
      status: "active",
    });

      navigate("/user-dashboard"); 
    } else {
      alert("Registration Failed: " + result.message);
    }
    console.log("Backend:", result);
  };


  return (
    <>
      <div className="register-container">
        <div className="register-box">
          <h2>User Registration</h2>
          

          <form className="register-form" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="input-group full">
              <FaUser />
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="input-group full">
              <FaEnvelope />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            {/* Username → FIXED */}
            <input
              name="user_name"
              className="register-input"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />

            {/* Role */}
            <select
              name="role"
              className="register-select"
              onChange={handleChange}
            >
               <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">User</option>
              <option value="staff">Instructor</option>
            </select>

            {/* Password */}
            <div className="input-group">
              <FaLock />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <FaLock />
              <input
                name="newPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="input-group full">
              <FaPhone />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <input
              name="address"
              className="register-input full"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              style={{ width: "94%" }}
            />

            {/* Department */}
            <input
              name="department"
              className="register-input"
              type="text"
              placeholder="Department"
              onChange={handleChange}
            />

            {/* Status */}
            <select
              name="status"
              className="register-select"
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Button */}
            <button type="submit" className="register-btn full"> 
              Register
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
