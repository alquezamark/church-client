import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger mb-3" onClick={logout}>Logout</button>
      <div className="list-group">
        <Link to="/admin/events" className="list-group-item list-group-item-action">Manage Events</Link>
        <Link to="/admin/programs" className="list-group-item list-group-item-action">Manage Programs</Link>
        <Link to="/admin/team" className="list-group-item list-group-item-action">Manage Team</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
