import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Footer from "../pages/footer";

export default function UserDashboard() {
  const [access, setAccess] = useState({
    read_access: false,
    write_access: false,
    update_access: false,
    delete_access: false
  });

  const [resources, setResources] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.user_name || "User";

  // Load access & resources
  useEffect(() => {
    if (storedUser) {
      setAccess({
        read_access: storedUser.read_access,
        write_access: storedUser.write_access,
        update_access: storedUser.update_access,
        delete_access: storedUser.delete_access
      });
    }

    fetchResources();
  }, []);

  // Fetch resources
  const fetchResources = async () => {
    const res = await fetch("https://revuteck-harshavardhan.onrender.com/api/resources");
    const data = await res.json();
    setResources(data.resources);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  //Delte button handels
  const handleDelete = async (id) => {
  try {
    console.log("Deleting file with id:", id);

    const res = await fetch(
      `https://revuteck-harshavardhan.onrender.com/api/resources/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();

    if (!res.ok) {
      return alert("Delete failed: " + data.message);
    }

    alert("File deleted successfully!");
    fetchResources();

  } catch (error) {
    console.error("Delete Error:", error);
    alert("Something went wrong while deleting.");
  }
};

  // console.log("Access Permissions:", data.resources);
  // console.log("Stored User:", resources);


  return (<>
    <div style={{ padding: "20px" }} className="wrapper">

      {/* TOP SECTION */}
      <div className="sec-top" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h2 style={{ textAlign: "left" }}>User Dashboard</h2>
          <p>Your access permissions determine what you can see & do.</p>
        </div>

        {/* USER PROFILE */}
        <div className="profile" style={{ display: "flex", alignItems: "center" }}>
          <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <FaUserCircle size={32} style={{ marginRight: "8px" }} />
          <p>{userName}</p>
        </div>
      </div>

      {/* DISPLAY FILES */}
      <div id="upload-docs" style={{ marginTop: "20px" }}>
        <h3>Available Files</h3>

        {!access.read_access && (
          <p style={{ color: "red" }}>You do not have permission to view files.</p>
        )}

        {access.read_access && (
          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>Title</th>
                <th>Filename</th>
                <th>Download</th>
                <th>Read</th>
                <th>Write</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((file) => (
                <tr key={file._id}>
                  <td>{file.title}</td>

                  <td>
                    <span
                      href={`https://revuteck-harshavardhan.onrender.com/${file.filePath}`}
                      target="_blank"
                      rel="noreferrer"

              
                    >
                      {file.filePath.split("resources").pop()} 
                    </span>
                   
                  </td>

                  <td>
                    <a
                      href={`https://revuteck-harshavardhan.onrender.com/${file.filePath}`}
                      download
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    {storedUser.read_access ? (
                       <a className="user-btn" style={{ padding: "5px 10px" }} href={`https://revuteck-harshavardhan.onrender.com/${file.filePath}`} target="_target">
                        Read
                        </a>
                        
                    ) : (
                      "No access"
                    )}
                  </td>

                  <td>
                    {storedUser.write_access ? (
                      <button style={{ padding: "5px 10px" }}>Write</button>
                    ) : ("No access")}
                  </td>
                  <td>
                    {storedUser.update_access ? (
                      <button style={{ padding: "5px 10px" }}>Update</button>
                    ) : ("No access")}
                  </td>
                  <td>
                    {storedUser.delete_access ? (
                      <button style={{ padding: "5px 10px" }}
                      onClick={()=> handleDelete(file._id)}
                      >Delete</button>
                    ) : ("No access")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        <h3>Resource Actions</h3>

        {/* READ */}
        {access.read_access ? (
          <button style={btnStyle}>Read Resource</button>
        ) : (
          <Disabled label="Read Resource" />
        )}

        {/* WRITE */}
        {access.write_access ? (
          <button style={btnStyle}>Write Resource</button>
        ) : (
          <Disabled label="Upload Resource" />
        )}

        {/* UPDATE */}
        {access.update_access ? (
          <button style={btnStyle}>Edit Resource</button>
        ) : (
          <Disabled label="Edit Resource" />
        )}

        {/* DELETE */}
        {access.delete_access ? (
          <button style={btnStyle}>Delete Resource</button>
        ) : (
          <Disabled label="Delete Resource" />
        )}
      </div>


    </div>
    <Footer />
  </>
  );
}

/* BUTTON STYLE */
const btnStyle = {
  padding: "8px 15px",
  background: "green",
  color: "white",
  border: "none",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

/* DISABLED BUTTON COMPONENT */
function Disabled({ label }) {
  return (
    <button
      disabled
      style={{
        padding: "8px 15px",
        background: "#666",
        color: "white",
        border: "none",
        marginRight: "10px",
        borderRadius: "6px",
        opacity: 0.6,
        cursor: "not-allowed"
      }}
    >
      {label}
    </button>
  );
}
