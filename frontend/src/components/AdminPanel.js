import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  // Project form
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  // Client form
  const [clientForm, setClientForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });
  // Data
  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Fetch contacts and subscriptions
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contacts")
      .then((res) => setContacts(res.data));
    axios
      .get("http://localhost:5000/api/subscriptions")
      .then((res) => setSubscriptions(res.data));
  }, []);

  // Project submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", projectForm.name);
    data.append("description", projectForm.description);
    data.append("image", projectForm.image);
    axios
      .post("http://localhost:5000/api/projects", data)
      .then(() => {
        alert("Project added");
        setProjectForm({ name: "", description: "", image: null });
      })
      .catch(() => alert("Error adding project"));
  };

  // Client submit
  const handleClientSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", clientForm.name);
    data.append("designation", clientForm.designation);
    data.append("description", clientForm.description);
    data.append("image", clientForm.image);
    axios
      .post("http://localhost:5000/api/clients", data)
      .then(() => {
        alert("Client added");
        setClientForm({
          name: "",
          designation: "",
          description: "",
          image: null,
        });
      })
      .catch(() => alert("Error adding client"));
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          required
          value={projectForm.name}
          onChange={(e) =>
            setProjectForm({ ...projectForm, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Project Description"
          required
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({ ...projectForm, description: e.target.value })
          }
        />
        <input
          type="file"
          required
          onChange={(e) =>
            setProjectForm({ ...projectForm, image: e.target.files[0] })
          }
        />
        <button type="submit">Add Project</button>
      </form>

      <h2>Add Client</h2>
      <form onSubmit={handleClientSubmit}>
        <input
          type="text"
          placeholder="Client Name"
          required
          value={clientForm.name}
          onChange={(e) =>
            setClientForm({ ...clientForm, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Designation"
          required
          value={clientForm.designation}
          onChange={(e) =>
            setClientForm({ ...clientForm, designation: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={clientForm.description}
          onChange={(e) =>
            setClientForm({ ...clientForm, description: e.target.value })
          }
        />
        <input
          type="file"
          required
          onChange={(e) =>
            setClientForm({ ...clientForm, image: e.target.files[0] })
          }
        />
        <button type="submit">Add Client</button>
      </form>

      <h2>Contact Form Details</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobileNumber}</td>
              <td>{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Subscribed Emails</h2>
      <ul>
        {subscriptions.map((s) => (
          <li key={s._id}>{s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
