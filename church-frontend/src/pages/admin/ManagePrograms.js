import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ title: "", description: "" });
  const [editProgram, setEditProgram] = useState({ id: "", title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/programs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }

      const data = await response.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("Failed to load programs.");
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProgram({ ...newProgram, [e.target.name]: e.target.value });
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/programs", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newProgram),
      });

      if (!response.ok) {
        throw new Error("Failed to add program");
      }

      fetchPrograms();
      setNewProgram({ title: "", description: "" });
    } catch (error) {
      setError("Error adding program.");
      console.error("Error adding program:", error);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/programs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete program");
      }

      fetchPrograms();
    } catch (error) {
      setError("Error deleting program.");
      console.error("Error deleting program:", error);
    }
  };

  // Open edit modal and set selected program details
  const openEditModal = (program) => {
    setEditProgram({ id: program._id, title: program.title, description: program.description });
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    setEditProgram({ ...editProgram, [e.target.name]: e.target.value });
  };

  // Handle update request
  const handleUpdateProgram = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/programs/${editProgram.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: editProgram.title, description: editProgram.description }),
      });

      if (!response.ok) {
        throw new Error("Failed to update program");
      }

      fetchPrograms();
    } catch (error) {
      setError("Error updating program.");
      console.error("Error updating program:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Programs</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Program Form */}
      <form onSubmit={handleAddProgram}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={newProgram.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={newProgram.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Program</button>
      </form>

      {/* Programs List */}
      <h3 className="mt-5">Existing Programs</h3>
      {loading ? (
        <p>Loading programs...</p>
      ) : programs.length > 0 ? (
        <ul className="list-group">
          {programs.map((program) => (
            <li key={program._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{program.title}</h5>
                <p>{program.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editProgramModal"
                  onClick={() => openEditModal(program)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProgram(program._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No programs found.</p>
      )}

      {/* Edit Program Modal */}
      <div className="modal fade" id="editProgramModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Program</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={editProgram.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={editProgram.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProgram}
                data-bs-dismiss="modal"
              >
                Update Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePrograms;
