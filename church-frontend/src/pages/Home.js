import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Container, Row, Col, Card, Spinner, Carousel } from "react-bootstrap";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://church-backend-9umb.onrender.com/api/events")
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
    <Container fluid className="home-container">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <header className="hero-section text-center text-white">
        <div className="hero-overlay">
          <h1>GREAT IS THE LORD'S FAITHFULNESS CHURCH</h1>
          <p>Join us in worship and fellowship as we grow in faith together.</p>
        </div>
      </header>

      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/1.jpg" alt="Slide 1" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/2.jpg" alt="Slide 2" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/3.jpg" alt="Slide 3" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/4.jpg" alt="Slide 4" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/5.jpg" alt="Slide 5" />
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Mission Section */}
      <section className="intro-section text-center my-5">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to spreading the love and teachings of Jesus Christ
          through worship, community, and service.
        </p>
      </section>

      {/* Upcoming Events Section */}
      <section className="latest-events my-5">
        <h2 className="text-center mb-4">Upcoming Events</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : events.length > 0 ? (
          <Row className="justify-content-center g-4">
            {events.map((event) => (
              <Col key={event._id} md={4} sm={6} xs={12}>
                <Card className="event-card shadow-lg text-center">
                  <Card.Body>
                    <Card.Title className="fw-bold">{event.title}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Card.Text>
                    <Card.Text>
                      <strong>Time:</strong> {event.time || "N/A"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location:</strong> {event.location || "N/A"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No upcoming events.</p>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer bg-dark text-light text-center py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: info@greatfaithchurch.org</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: Purok Bang-ar, Eguia, Dasol, Pangasinan</p>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                <li><a href="/about" className="text-light text-decoration-none">About</a></li>
                <li><a href="/programs" className="text-light text-decoration-none">Our Programs</a></li>
                <li><a href="/team" className="text-light text-decoration-none">Our Team</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Follow Us</h5>
              <p>Facebook | Twitter | Instagram</p>
            </Col>
          </Row>
          <hr className="bg-light" />
          <p className="mb-0">&copy; 2025 Great is the Lord's Faithfulness Church. All Rights Reserved.</p>
        </Container>
      </footer>
    </Container>
  );
}

export default Home;
