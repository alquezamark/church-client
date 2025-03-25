import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", bio: "", image: null });

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
      .then((response) => response.json())
      .then((data) => {
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
    setFormData(member || { name: "", role: "", bio: "", image: null });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      ? `http://localhost:5000/api/team/${editingMember._id}`
      : "http://localhost:5000/api/team";

    const response = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formDataObj,
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error saving team member");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      const response = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error deleting team member");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Team</h2>
      <Button onClick={() => handleShowModal()}>Add Team Member</Button>
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="row mt-3">
          {team.map((member) => (
            <div key={member._id} className="col-md-4">
              <div className="card p-3 mb-3">
                <img src={member.image} alt={member.name} className="img-fluid" />
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
