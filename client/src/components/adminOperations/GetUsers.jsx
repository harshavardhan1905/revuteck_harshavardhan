import React, { useEffect, useState } from "react";

export default function GetUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    setLoading(true);

    fetch("http://localhost:5000/api/allusers")
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.json();
          throw new Error(msg.message || "Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // SEARCH FILTER LOGIC
  useEffect(() => {
    const s = search.toLowerCase();
    const filtered = users.filter((u) =>
      u.fullName.toLowerCase().includes(s) ||
      u.user_name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.role.toLowerCase().includes(s) ||
      (u.department || "").toLowerCase().includes(s) ||
      (u.phone || "").toLowerCase().includes(s) ||
      u.status.toLowerCase().includes(s)
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div className="top">
        <h2>All Users</h2>

      {/* SEARCH BAR */}
      {/* Refresh button */}
      <button
        onClick={fetchUsers}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          cursor: "pointer",
          background: "#4a78ff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Refresh
      </button>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "30%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      </div>

      

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u._id}>
              <td>{u.fullName}</td>
              <td>{u.user_name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.phone || "--"}</td>
              <td>{u.department || "--"}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
