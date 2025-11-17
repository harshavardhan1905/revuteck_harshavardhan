import React, { useEffect, useState } from "react";

export default function AccessManagement() {
  const [users, setUsers] = useState([]);
  const [editedAccess, setEditedAccess] = useState({});

  // Fetch all users
  const loadUsers = async () => {
    const res = await fetch("http://localhost:5000/api/allusers");
    const data = await res.json();
    setUsers(data.users);

    let accessData = {};
    data.users.forEach(u => {
      accessData[u.user_name] = {
        read: u.read_access ?? false,
        write: u.write_access ?? false,
        update: u.update_access ?? false,
        delete: u.delete_access ?? false
      };
    });

    setEditedAccess(accessData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleAccess = (user_name, field, value) => {
    setEditedAccess(prev => ({
      ...prev,
      [user_name]: {
        ...prev[user_name],
        [field]: value
      }
    }));
  };

  // Update access
  const saveAccess = async (user_name) => {
    const access = editedAccess[user_name];

    await fetch(`http://localhost:5000/api/access/update-access/${user_name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        read_access: access.read,
        write_access: access.write,
        update_access: access.update,
        delete_access: access.delete
      })
    });

    alert("Access updated!");
    loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Access Management</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Read</th>
            <th>Write</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.user_name}</td>

              <td>
                <input
                  type="checkbox"
                  checked={editedAccess[u.user_name]?.read || false}
                  onChange={(e) =>
                    toggleAccess(u.user_name, "read", e.target.checked)
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={editedAccess[u.user_name]?.write || false}
                  onChange={(e) =>
                    toggleAccess(u.user_name, "write", e.target.checked)
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={editedAccess[u.user_name]?.update || false}
                  onChange={(e) =>
                    toggleAccess(u.user_name, "update", e.target.checked)
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={editedAccess[u.user_name]?.delete || false}
                  onChange={(e) =>
                    toggleAccess(u.user_name, "delete", e.target.checked)
                  }
                />
              </td>

              <td>
                <button
                  onClick={() => saveAccess(u.user_name)}
                  style={{
                    padding: "6px 14px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
