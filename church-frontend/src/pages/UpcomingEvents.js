import React, { useEffect, useState } from "react";
import "../styles/Home.css";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events") // Replace with actual API URL if different
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Great is the Lord's Faithfulness Church</h1>
          <p>Join us in worship and fellowship as we grow in faith together.</p>
        </div>
      </header>
      
      <section className="intro-section">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to spreading the love and teachings of Jesus Christ
          through worship, community, and service.
        </p>
      </section>
      
      <section className="latest-events">
        <h2>Upcoming Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <div className="events-container">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                <p><strong>Time:</strong> {event.time || "N/A"}</p>
                <p><strong>Location:</strong> {event.location || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming events.</p>
        )}
      </section>
    </div>
  );
}

export default UpcomingEvents;
