import React, { useState, useEffect } from "react";
import Footer from "./footer";
import { FaUser, FaBell } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logoo.png";

export default function Dashboard() {

    // Theme toggle logic

    const navigate = useNavigate();

    // Theme toggle logic
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    };


    // COUNTS
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        admins: 0,
        resources: 0,
    });

    // Fetch All Users
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:5000/api/allusers");
        const data = await res.json();

        const users = data.users || [];

        const totalUsers = users.length;
        const admins = users.filter(u => u.role === "admin").length;
        const activeUsers = users.filter(u => u.status === "active").length;

        setStats(prev => ({
            ...prev,
            totalUsers,
            admins,
            activeUsers,
        }));
    };

    // Fetch Resources Count
    const fetchResources = async () => {
        const res = await fetch("http://localhost:5000/api/resources");
        const data = await res.json();

        setStats(prev => ({
            ...prev,
            resources: data.resources.length || 0
        }));
    };

    // Load both APIs
    useEffect(() => {
        fetchUsers();
        fetchResources();
    }, []);

    return (
        <>
            <div className="welcome-container wrapper">
                <header className="header">

                    {/* LEFT SIDE */}
                    <div className="title header-title">
                        <div>
                            <img src={Logo} alt="" style={{ "height": "80px" }} />
                        </div>
                        <div>
                            <h1>
                                Welcome to User Management System
                                <FaUser style={{
                                    color: "#2f2f2d",
                                    marginLeft: "8px"
                                }} />
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
                            style={{ cursor: "pointer", marginRight: 15 }}
                        >
                            {theme === "light" ? (
                                <BsMoonFill size={22} style={{ color: "#444" }} />
                            ) : (
                                <BsSunFill size={22} style={{ color: "gold" }} />
                            )}
                        </div>


                        <button className="register-btn" onClick={() => navigate('/register')}>Register</button>

                        <button className="login-btn" onClick={() => navigate('/login')}>
                            Login <MdLogin style={{ color: "white", marginLeft: "5px", fontSize: "24px" }} />
                        </button>
                        <button className="login-btn "
                            style={{ background: "#4CAF50" }}
                            onClick={() => navigate('/admin-login')}>
                            Admin Login <MdLogin style={{ color: "white", marginLeft: "5px", fontSize: "24px" }} />
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
                            <ol className="notification-list" style={{ "left": "-32px" }}>
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
                        <h2>Welcome to Revuteck Dashboard</h2>
                        <p>Your smart workspace to manage users, monitor activity, and keep your system running smoothly.</p>

                        <ul>
                            <li>User Statistics & Insights</li>
                            <li>Recent System Activities</li>
                            <li>Application Health Monitoring</li>
                            <li>Quick Administrative Actions</li>
                        </ul>

                    </section>


                </main>
                <div className="stats-section">

                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p>{stats.totalUsers}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Active Users</h3>
                        <p>{stats.activeUsers}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Uploaded Resources</h3>
                        <p>{stats.resources}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Admins</h3>
                        <p>{stats.admins}</p>
                    </div>

                </div>

                <p className="quote">
                    "Empowering your workflow with intelligent user management."
                </p>



            </div>
            <Footer />
        </>
    );
}
