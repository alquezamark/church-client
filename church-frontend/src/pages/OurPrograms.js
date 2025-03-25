import React, { useState, useEffect } from "react";

const OurPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

 const fetchPrograms = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch("https://church-backend-9umb.onrender.com/api/programs");
    if (!response.ok) {
      throw new Error("Failed to fetch programs");
    }
    const data = await response.json();
    console.log("Fetched Programs:", data); // ✅ Debugging log

    if (Array.isArray(data)) {
      setPrograms(data);
    } else {
      setPrograms([]);
      console.error("Unexpected API response:", data);
    }
  } catch (error) {
    setError("Failed to load programs. Please try again.");
    console.error("Error fetching programs:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container mt-5">
      <h2>Our Programs</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading programs...</p>
      ) : programs.length > 0 ? (
        <ul className="list-group">
          {programs.map((program) => (
            <li key={program._id} className="list-group-item">
              <h5>{program.title}</h5>
              <p>{program.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No programs available.</p>
      )}
    </div>
  );
};

export default OurPrograms;
