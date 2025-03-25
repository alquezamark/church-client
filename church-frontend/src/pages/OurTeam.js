import React, { useState, useEffect } from "react";

const OurTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch("https://church-backend-9umb.onrender.com/api/team");
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTeam(data);
      } else {
        console.error("Unexpected API response:", data);
        setTeam([]);
      }
    } catch (error) {
      console.error("Error fetching team:", error);
      setTeam([]);
    }
  };

  return (
    <div className="container mt-5 text-center text-white" style={{ backgroundColor: "black", padding: "50px" }}>
    <style>
      {`
        .team-image {
          width: 150px; /* Adjust size as needed */
          height: 150px; /* Keep it equal to make it circular */
          object-fit: cover; /* Ensures the image fills the circle properly */
          border: 3px solid white; /* Optional: Adds a border */
        }
      `}
    </style>
      <h2 className="mb-4">Our Team</h2>
      <div className="row">
        {team.map((member) => (
          <div key={member._id} className="col-md-4 text-center mb-4">
            <img 
                    src={`http://localhost:5000${member.image}`} 
                    alt={member.name} 
                    className="img-fluid rounded-circle team-image" 
                    onError={(e) => e.target.src = "fallback-image.jpg"} 
                  />
            <h4 className="mt-3">{member.name}</h4>
            <h6 className="text-uppercase">{member.role}</h6>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
