import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* LEFT SIDE */}
        <div className="footer-left">
          <h3>User Management System</h3>
          <p>Manage users, roles, and permissions efficiently.</p>

          <div className="social-icons">
            <a href="https://www.facebook.com/podeti.harshavardhan/" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>

            <a href="https://www.instagram.com/harshavardhan_official00/?next=%2F" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://github.com/harshavardhan1905" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>

            <a href="https://www.linkedin.com/in/harshavardhan05/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
    {/* CENTER */}
        <div className="footer-center"> 
          <h4>Contact</h4>
          <p><strong>Email:</strong> harshavardhan@example.com</p>
          <p><strong>Phone:</strong> +91 73308 23490</p>
          </div>
        {/* RIGHT SIDE */}
        <div className="footer-right">
          

          <p className="developer">Developed by Harshavardhan Podeti</p>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
