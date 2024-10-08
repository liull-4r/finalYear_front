/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./DoctorAvailability.css"; // Import custom styles

const DoctorAvailable = ({ doctorId }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/availability/?doctor_id=${doctorId}`
        );
        setAvailabilities(response.data);
      } catch (error) {
        console.error("Error fetching availabilities:", error);
        setError("Error fetching availabilities.");
        toast.error("Error fetching availabilities.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerdocd">
      <p>
        Doctor's is available at this time only please make appointement at this
        time only
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="availability-list">
        {availabilities.map((availability) => (
          <li key={availability.id} className="availability-item">
            <p>Date: {availability.date}</p>
            <p>Day: {availability.day}</p>
            <p>Start Time: {availability.start_time_formatted}</p>
            <p>End Time: {availability.end_time_formatted}</p>
            {/* Link to the update page with availability ID included */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAvailable;
