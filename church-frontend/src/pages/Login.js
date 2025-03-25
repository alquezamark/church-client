import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css"; // Import CSS for styling
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch("https://church-backend-9umb.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response: " + text);
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
        login(credentials, navigate);
        window.location.href = "/"; // Reload page to update navbar
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="login-card p-4">
          <h2 className="text-center text-dark">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="login-input"
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="login-input"
              />
            </Form.Group>
            <Button type="submit" className="w-100 login-button">Sign In</Button>
          </Form>
         {/* <div className="text-center mt-3">
            <small className="text-light">New to our site? <a href="/register" className="text-danger">Sign up now</a></small>
          </div>*/}
        </Card>
      </Container>
    </div>
  );
};

export default Login;