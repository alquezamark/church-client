import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Removed BrowserRouter
import Home from "./pages/Home";
import About from "./pages/About";
import OurTeam from "./pages/OurTeam";
import OurPrograms from "./pages/OurPrograms";
import Events from "./pages/Events";
import VisitUs from "./pages/VisitUs";
import Admin from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageEvents from "./pages/admin/ManageEvents";
import ManagePrograms from "./pages/admin/ManagePrograms";
import ManageTeam from "./pages/admin/ManageTeam";
import UpcomingEvents from "./pages/UpcomingEvents";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <> {/* ✅ Removed <Router> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/our-programs" element={<OurPrograms />} />
        <Route path="/events" element={<Events />} />
        <Route path="/visit-us" element={<VisitUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
        <Route path="/admin/programs" element={<ProtectedRoute><ManagePrograms /></ProtectedRoute>} />
        <Route path="/admin/team" element={<ProtectedRoute><ManageTeam /></ProtectedRoute>} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/manage-team" element={<ManageTeam />} />
        <Route path="/programs" element={<OurPrograms />} />
      </Routes>
    </>
  );
}

export default App;
