import React, { useState } from "react";

export default function DeleteUser() {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!userName.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/delete/${userName}`,
        {
          method: "DELETE", // ❤️ IMPORTANT
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        setMessage("");
      } else {
        setMessage(result.message);
        setError("");
        setUserName("");
      }
    } catch (err) {
      setError("Something went wrong");
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>Delete User</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Delete User
      </button>

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
