import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";

const DoctorUpload = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/doctors/"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleMakeAppointment = (doctorId) => {
    // Navigate to the appointment page with the doctor's user_id as a query parameter
    navigate("/upload", { state: { doctorIdK: doctorId } });
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2>
        Here is The List of Doctors Select Doctors And Upload Mri Scan Image
      </h2>
      <div className="doctors-container">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img
              src={`http://localhost:9000${doctor.image}`}
              alt={doctor.first_name}
              className="doctor-image"
            />
            <div>
              <h3>
                {doctor.first_name} {doctor.last_name}
              </h3>
              <p>Phone: {doctor.phone}</p>
              <p>City: {doctor.city}</p>
              <p>Bio: {doctor.bio}</p>
            </div>
            <button
              className="appointment-button"
              onClick={() => handleMakeAppointment(doctor.user_id)}
            >
              Upload
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorUpload;
