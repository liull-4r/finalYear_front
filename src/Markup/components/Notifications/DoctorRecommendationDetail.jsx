import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DoctorRecommendationDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/specialistrecommendation/${id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Specialist Recommendation</h2>
      <p>{appointment.recommendation}</p>
    </div>
  );
};

export default DoctorRecommendationDetail;
