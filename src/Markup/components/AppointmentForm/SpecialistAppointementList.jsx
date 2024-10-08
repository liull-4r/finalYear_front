import { useState, useEffect } from "react";
import axios from "axios";
import "./Appointemet.css";
import { jwtDecode } from "jwt-decode"; // Correct import statement

const SpecialistAppointementList = () => {
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/appointments/?specialist_id=${user?.user_id}`
        );
        setAppointments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.user_id]); // Add user?.user_id as dependency

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

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Appointments</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {appointments.length === 0 ? (
            <div>No Appointement is available</div>
          ) : (
            <div className="appointment-cards">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <table
                    style={{
                      margin: "auto",
                      borderCollapse: "collapse",
                      border: "2px solid black",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Patient First Name:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {appointment.patient_first_name}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Patient Last Name:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {appointment.patient_last_name}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Patient Phone:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {appointment.patient_phone}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Patient City:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {appointment.patient_city}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Date:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {formatDate(appointment.appointment_datetime)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Time:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {formatTime(appointment.appointment_datetime)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Notes:
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {appointment.notes}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialistAppointementList;
