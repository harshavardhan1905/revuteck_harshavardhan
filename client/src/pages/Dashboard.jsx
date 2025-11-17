import React, { useState, useEffect } from "react";
import Footer from "./footer";
import { FaUser, FaBell } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logoo.png";

export default function Dashboard() {

    // Theme toggle logic
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);

        document.body.style.background =
            savedTheme === "dark" ? "#1a1a1a" : "#efb6b672";

        document.body.style.color =
            savedTheme === "dark" ? "#efb6b672" : "#000000";
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.body.style.background =
            newTheme === "dark" ? "#1a1a1a" : "#efb6b672";
        document.body.style.color =
            newTheme === "dark" ? "#efb6b672" : "#000000";
    };

    return (
        <div className="welcome-container">
            <header className="header">

                {/* LEFT SIDE */}
                <div className="title header-title">
                    <div>
                        <img src={Logo} alt=""  style={{"height":"80px"}}/>
                    </div>
                    <div>
                        <h1>
                        Welcome to User Management System
                        <FaUser style={{ color: "green", marginLeft: "8px" }} />
                    </h1>
                    <p>Manage users, roles, and permissions efficiently.</p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="btns">

                    {/* Theme Toggle Button */}
                    <div
                        className="theme-toggle"
                        onClick={toggleTheme}
                        style={{ cursor: "pointer", marginRight: "15px" }}
                    >
                        {theme === "light" ? (
                            <BsSunFill size={22} style={{ color: "orange" }} />
                        ) : (
                            <BsMoonFill size={22} style={{ color: "skyblue" }} />
                        )}
                    </div>

                    <button className="register-btn" onClick={()=>navigate('/register')}>Register</button>

                    <button className="login-btn" onClick={()=> navigate('/login')}>
                        Login <MdLogin style={{ color: "blue", marginLeft: "5px", fontSize: "24px" }} />
                    </button>

                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="main-section">

                <aside className="notification-tab">
                    <div>
                        <h2 className="not-title">
                            Notifications
                            <FaBell style={{ color: "orange", marginLeft: "8px" }} />
                        </h2>
                    </div>

                    {/* scrolling area starts below title */}
                    <div className="notification-list-wrapper">
                        <ol className="notification-list" style={{"left":"-32px"}}>
                            <li>Added user user_name</li>
                            <li>Updated user user_name</li>
                            <li>Deleted user user_name</li>
                            <li>Added user John</li>
                            <li>Updated user Harsha</li>
                            <li>Deleted user Mahesh</li>
                            <li>Added new admin</li>
                            <li>Reset user password</li>
                        </ol>
                    </div>
                </aside>


                <section className="content">
                    <h2>Dashboard</h2>
                    <p>Login to get access</p>
                    <p>Here you can able to see.</p>
                    <ul>
                        <li>User Statistics</li>
                        <li>Recent Activities</li>
                        <li>System Health</li>
                        <li>Quick Actions</li>
                    </ul>
                </section>

            </main>

            <Footer />
        </div>
    );
}
