import React, { useState, useEffect } from "react";

export default function ResourceManagement() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    const res = await fetch("https://revuteck-harshavardhan.onrender.com/api/resources");
    const data = await res.json();
    setResources(data.resources);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const uploadFile = async () => {
    if (!file || !title) return alert("Title and file required");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    await fetch("https://revuteck-harshavardhan.onrender.com/api/resources/upload", {
      method: "POST",
      body: formData
    });

    setTitle("");
    setFile(null);
    fetchResources();
  };

  const deleteResource = async (id) => {
    await fetch(`https://revuteck-harshavardhan.onrender.com/api/resources/${id}`, {
      method: "DELETE"
    });
    fetchResources();
  };

  const updateTitle = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    await fetch(`https://revuteck-harshavardhan.onrender.com/api/resources/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    });

    fetchResources();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resource Management</h2>

      {/* Upload Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadFile}>Upload</button>
      </div>

      {/* Resources List */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {resources.map((r) => (
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>
                {/* <a href={`/${r.filePath}`} target="_blank">View</a> */}
                <a href={`https://revuteck-harshavardhan.onrender.com/${r.filePath}`} target="_blank">View</a>

              </td>
              <td>
                <button onClick={() => updateTitle(r._id)}>Edit</button>
                <button onClick={() => deleteResource(r._id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
