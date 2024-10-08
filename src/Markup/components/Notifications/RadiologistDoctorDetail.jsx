import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RadiologistDoctorDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/radiologistdoctor/${id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Medical Record</h2>
      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          border: "2px solid black",
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient First Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_first_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Last Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_last_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Phone:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_phone}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient City:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_city}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Mri Scan Image:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <a href={appointment.image} target="_blank" download={true}>
                Patient Mri Scan Image
              </a>
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Radiologist Diagnosis:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.prediction}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Weight:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_weight}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Diastolic Blood Pressure:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_diastolic_blood_pressure}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Blood Sugar Level:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_blood_sugar_level}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Heart Rate:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_heart_rate}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Patient Cholestrol Level:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.patient_cholesterol_level}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Doctor Diagnosis & Treatment Plan:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.doctor_notes}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Radiologist Recommendation:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.recommendation}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RadiologistDoctorDetail;
