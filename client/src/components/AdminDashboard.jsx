import React, { useState } from "react";
import Footer from "../pages/footer";
import AddUser from "./adminOperations/Register.jsx";
import Allusers from "./adminOperations/GetUsers.jsx";
import DeleteUser from "./adminOperations/DeleteUser.jsx";
import ResourceManagement from "./ResourceManagement.jsx";
import AccessManagement from "./AccessManagement.jsx";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("manage-access");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "manage-access":
        return (
          <>
          <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
             <h2>Manage Access Section</h2>
            {/* <div className="logout-container" style={{justifyContent:"flex-end", width:"60%"}}>
              <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            </div> */}
           
          </div>
            
            <AccessManagement />
          </>
        );
      case "add-user":
        return <AddUser />;
      case "delete-user":
        return <DeleteUser />;
      case "update-user":
        return <h2>Update User Section</h2>;
      case "view-users":
        return <Allusers />;
      case "resource-update":
        return (
          <>
            <h2>Resource Update Page</h2>
            <ResourceManagement />
          </>
        );
      default:
        return <h2>Welcome to User Dashboard</h2>;
    }
  };

  return (
    <>


      <div className="user-dashboard">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="logout-container" style={{justifyContent:"flex-end", width:"60%"}}>
              <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            </div>
          <h3 className="sidebar-title">User Actions</h3>

          <ul style={{    color: "white"}}>
            <li onClick={() => setActiveSection("manage-access")}>Manage Access</li>
            <li onClick={() => setActiveSection("add-user")}>Add User</li>
            <li onClick={() => setActiveSection("delete-user")}>Delete User</li>
            <li onClick={() => setActiveSection("update-user")}>Update User</li>
            <li onClick={() => setActiveSection("view-users")}>Get Users</li>
            <li onClick={() => setActiveSection("resource-update")}>Update Resource</li>
          </ul>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="dashboard-content">
          

          {renderContent()}
        </main>
      </div>

      <Footer />
    </>
  );
}
