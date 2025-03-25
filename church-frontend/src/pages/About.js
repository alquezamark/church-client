import React from "react";
import "../styles/About.css";
import { Container, Row, Col, Card, Spinner, Carousel } from "react-bootstrap";

function About() {
  return (
    <div className="about-container container mt-5">
      <header className="about-header text-center mb-4">
        <h1>About Us</h1>
      </header>
      
      <div className="row">
        {/* Our Story Card */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h2 className="card-title">Our Story</h2>
              <p className="card-text">
                Great is the Lord's Faithfulness Church has been serving the 
                community for years, spreading the love and teachings of Jesus Christ.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h2 className="card-title">Our Mission</h2>
              <p className="card-text">
                We are dedicated to worship, community, and service, striving 
                to bring people closer to God.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h2 className="card-title">Our Vision</h2>
              <p className="card-text">
                To create a welcoming environment where faith and fellowship 
                grow stronger each day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export default About;
