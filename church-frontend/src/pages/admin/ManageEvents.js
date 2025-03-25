import React, { useState, useEffect } from "react";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://church-backend-9umb.onrender.com/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async () => {
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) {
      console.error("All fields are required.");
      return;
    }

    const newEvent = {
      title: eventTitle,
      date: new Date(eventDate).toISOString(),
      time: eventTime,
      location: eventLocation,
    };

    try {
      const response = await fetch("https://church-backend-9umb.onrender.com/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) throw new Error("Error adding event");

      fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventDate(event.date.split("T")[0]); // Extract YYYY-MM-DD format
    setEventTime(event.time);
    setEventLocation(event.location);
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent) return;

    const updatedEvent = {
      title: eventTitle,
      date: new Date(eventDate).toISOString(),
      time: eventTime,
      location: eventLocation,
    };

    try {
      const response = await fetch(
        `https://church-backend-9umb.onrender.com/api/events/${selectedEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) throw new Error("Error updating event");

      fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`https://church-backend-9umb.onrender.com/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) throw new Error("Error deleting event");

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
  };

  return (
    <div className="container mt-4">
      <h2>Manage Events</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          className="form-control"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Event Time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>

      {selectedEvent ? (
        <button className="btn btn-warning" onClick={handleUpdateEvent}>
          Update Event
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleAddEvent}>
          Add Event
        </button>
      )}

      <h3 className="mt-4">Existing Events</h3>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{event.title}</h5>
              <p>
                <strong>Date:</strong> {event.date.split("T")[0]} | <strong>Time:</strong> {event.time} | <strong>Location:</strong> {event.location}
              </p>
            </div>
            <div>
              <button className="btn btn-sm btn-info me-2" onClick={() => handleEditClick(event)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(event._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEvents;
