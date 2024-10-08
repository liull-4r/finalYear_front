import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";
const SpecialistList = () => {
  const [specialists, setSpecialists] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/specialists/"
        );
        setSpecialists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching specialists:", error);
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  const handleRequest = (specialistId) => {
    navigate("/doctorspecialistrequest", {
      state: { specialistIdK: specialistId },
    });
  };

  const toggleBio = (doctorId) => {
    setExpandedBios((prevState) => ({
      ...prevState,
      [doctorId]: !prevState[doctorId],
    }));
  };

  const renderBio = (bio, doctorId) => {
    const isExpanded = expandedBios[doctorId];
    const words = bio.split(" ");
    const shouldShowSeeMore = words.length > 50;
    return (
      <div>
        <p>{isExpanded ? bio : words.slice(0, 50).join(" ") + "..."}</p>
        {shouldShowSeeMore && (
          <button
            onClick={() => toggleBio(doctorId)}
            className="see-more-button"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h4>
        Here is The List of Specialists. Select a Specialist and Make request to
        Specialist
      </h4>
      {loading && <p>Loading, please wait...</p>}{" "}
      {/* Render loading message if loading is true */}
      {!loading && (
        <div className="doctors-container">
          {specialists.map((specialist) => (
            <div key={specialist.id} className="doctor-card">
              <img
                src={`http://localhost:9000${specialist.image}`}
                alt={specialist.first_name}
                className="doctor-image"
              />
              <div>
                <p>
                  Dr {specialist.first_name} {specialist.last_name}
                </p>
                <p>Phone: {specialist.phone}</p>
                <p>City: {specialist.city}</p>
                Bio:{renderBio(specialist.bio, specialist.id)}
              </div>
              <br />
              {/* <DoctorAvailable doctorId={doctor.id} /> */}
              <button
                className="appointment-button"
                onClick={() => handleRequest(specialist.user_id)}
              >
                Make Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialistList;
