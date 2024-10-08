import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";
const SpecialistDoctorForRecommendation = () => {
  const [doctors, setDoctors] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/doctors/"
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handlePostToDoctor = (doctorId) => {
    navigate("/specialistrecommendation", { state: { doctorIdK: doctorId } });
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
      <h2>Here is The List of Doctors.</h2>
      {loading && <p>Loading, please wait...</p>}{" "}
      {!loading && (
        <div className="doctors-container">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={`http://localhost:9000${doctor.image}`}
                alt={doctor.first_name}
                className="doctor-image"
              />
              <div>
                <h6>
                  Dr {doctor.first_name} {doctor.last_name}
                </h6>
                <p>Phone: {doctor.phone}</p>
                <p>City: {doctor.city}</p>
                Bio:{renderBio(doctor.bio, doctor.id)}
              </div>
              <br />
              {/* <DoctorAvailable doctorId={doctor.id} /> */}
              <button
                className="appointment-button"
                onClick={() => handlePostToDoctor(doctor.user_id)}
              >
                Post To Doctor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialistDoctorForRecommendation;
