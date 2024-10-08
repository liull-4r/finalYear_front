import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/appointments/${id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Appointment Detail</h2>
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
              Patient Document:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <Link
                to={`http://localhost:9000/${appointment.patient_document}`}
                target="_blank"
              >
                View Document
              </Link>
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Date:</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {formatDate(appointment.appointment_datetime)}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Time:</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {formatTime(appointment.appointment_datetime)}
            </td>
          </tr>
         
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Notes:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {appointment.notes}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDetail;
