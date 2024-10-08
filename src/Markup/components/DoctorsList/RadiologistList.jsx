import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";
const RadiologistList = () => {
  const [radiologists, setRadiologists] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/radiologists/"
        );
        setRadiologists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching specialists:", error);
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  const handlePostToRadiologist = (radiologistId) => {
    navigate("/doctorradiologistpost", {
      state: { radiologistIdK: radiologistId },
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
  console.log(radiologists);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h4>
        Here is The List of Radiologists. Select a radiologist to post to
        radiologist
      </h4>
      {loading && <p>Loading, please wait...</p>}{" "}
      {!loading && (
        <div className="doctors-container">
          {radiologists.map((radiologist) => (
            <div key={radiologist.id} className="doctor-card">
              <img
                src={`http://localhost:9000${radiologist.image}`}
                alt={radiologist.first_name}
                className="doctor-image"
              />
              <div>
                <p>
                  {radiologist.first_name} {radiologist.last_name}
                </p>
                <p>Phone: {radiologist.phone}</p>
                <p>City: {radiologist.city}</p>
                Bio:{renderBio(radiologist.bio, radiologist.id)}
              </div>
              <br />
              <button
                style={{ backgroundColor: "#3368c6" }}
                className="appointment-button"
                onClick={() => handlePostToRadiologist(radiologist.user_id)}
              >
                Refer To Radiologist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadiologistList;
