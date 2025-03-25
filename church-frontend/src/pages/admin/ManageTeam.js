import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";


const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", bio: "", image: null });

 useEffect(() => {
  fetch("https://church-backend-9umb.onrender.com/api/team")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched team data:", data); // Log to check image paths
      setTeam(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching team members:", error);
      setLoading(false);
    });
}, []);


  const handleShowModal = (member = null) => {
    setEditingMember(member);
    setFormData(member ? { ...member, image: null } : { name: "", role: "", bio: "", image: null });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("role", formData.role);
    formDataObj.append("bio", formData.bio);
    if (formData.image) formDataObj.append("image", formData.image);

    const method = editingMember ? "PUT" : "POST";
    const url = editingMember
      ? `https://church-backend-9umb.onrender.com/api/team/${editingMember._id}`
      : "https://church-backend-9umb.onrender.com/api/team";

    const response = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formDataObj,
    });

    if (response.ok) {
      const updatedTeam = editingMember
        ? team.map((m) => (m._id === editingMember._id ? { ...m, ...formData } : m))
        : [...team, await response.json()];
      setTeam(updatedTeam);
      handleCloseModal();
    } else {
      console.error("Error saving team member");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      const response = await fetch(`https://church-backend-9umb.onrender.com/api/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        setTeam(team.filter((member) => member._id !== id));
      } else {
        console.error("Error deleting team member");
      }
    }
  };

  return (
    <div className="container mt-5">
    <style>
      {`
        .team-image {
          width: 150px; /* Adjust size as needed */
          height: 150px; /* Keep it equal to make it circular */
          object-fit: cover; /* Ensures the image fills the circle properly */
          border: 3px solid white; /* Optional: Adds a border */
        }
      `}
    </style>
      <h2>Manage Team</h2>
      <Button onClick={() => handleShowModal()}>Add Team Member</Button>
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="row mt-3">
          {team.map((member) => (
            <div key={member._id} className="col-md-4">
              <div className="card p-3 mb-3">
                <div className="d-flex justify-content-center">
                  <img 
                    src={`https://church-backend-9umb.onrender.com${member.image}`} 
                    alt={member.name} 
                    className="img-fluid rounded-circle team-image" 
                    onError={(e) => e.target.src = "fallback-image.jpg"} 
                  />
                </div>





                <h5>{member.name}</h5>
                <p>{member.role}</p>
                <Button variant="primary" onClick={() => handleShowModal(member)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(member._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMember ? "Edit Team Member" : "Add Team Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" value={formData.role} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleFileChange} />
            </Form.Group>
            <Button type="submit" className="mt-3">{editingMember ? "Update" : "Add"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>

  );
};

export default ManageTeam;
