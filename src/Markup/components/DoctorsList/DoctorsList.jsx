import { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorsList.css";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const [loading, setLoading] = useState(true);

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

  const toggleBio = (doctorId) => {
    setExpandedBios((prevState) => ({
      ...prevState,
      [doctorId]: !prevState[doctorId],
    }));
  };

  const renderBio = (bio, doctorId) => {
    const isExpanded = expandedBios[doctorId];
    const words = bio.split(" ");
    const shouldShowSeeMore = words.length > 25;
    return (
      <div>
        <p>{isExpanded ? bio : words.slice(0, 25).join(" ") + "..."}</p>
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
      <h2 className="text-center mb-4">Here is The List of Doctors</h2>
      {loading && <p>Loading, please wait...</p>}
      {!loading && (
        <div className="doctors-container">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={`http://localhost:9000${doctor.image}`}
                alt={doctor.first_name}
                className="doctor-image"
              />
              <div className="doctor-info">
                <p>
                  Dr {doctor.first_name} {doctor.last_name}
                </p>
                <p className="doctor-phone">Phone: {doctor.phone}</p>
                <p className="doctor-city">City: {doctor.city}</p>
                <div className="doctor-bio">
                  <strong>Bio:</strong> {renderBio(doctor.bio, doctor.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
