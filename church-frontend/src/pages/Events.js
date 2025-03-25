import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://church-backend-9umb.onrender.com/api/events", {
        headers: { Authorization: token },
      });

      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        alert("Failed to fetch events.");
      }
    } catch (error) {
      alert("Error fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events Page</h1>
      {loading ? <p>Loading...</p> : events.map((event) => <p key={event._id}>{event.title}</p>)}
    </div>
  );
};

export default Events;
