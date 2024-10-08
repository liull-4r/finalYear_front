import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DoctorSpecialistNotification = () => {
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/doctorspecialistnotifications/?specialist_id=${user?.user_id}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  const extractAppointmentId = (message) => {
    const match = message.match(/\(ID: (\d+)\)/);
    return match ? match[1] : "";
  };

  const removeIdFromMessage = (message) => {
    return message.replace(/\(ID: \d+\)/, "").trim();
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:9000/detection/doctorspecialistnotifications/${notificationId}/`,
        {
          read: true,
        }
      );
      // Update the state to reflect the change
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notifications {notifications.length}</h2>
      {notifications.length === 0 ? (
        <p>No notifications Available</p>
      ) : (
        <div style={styles.notificationContainer}>
          {notifications.map((notification) => (
            <div key={notification.id} style={styles.notification}>
              {notification.message.startsWith("New Message") ? (
                <Link
                  to={`/doctorspecialistdetail/${extractAppointmentId(
                    notification.message
                  )}`}
                >
                  <p>{removeIdFromMessage(notification.message)}</p>
                </Link>
              ) : notification.message.startsWith("New Request") ? (
                <Link
                  to={`/doctorspecialistrequestdetail/${extractAppointmentId(
                    notification.message
                  )}`}
                >
                  <p>{removeIdFromMessage(notification.message)}</p>
                </Link>
              ) : (
                <p>{removeIdFromMessage(notification.message)}</p>
              )}
              {!notification.read && (
                <button
                  style={{
                    backgroundColor: "#3368C6",
                    borderRadius: "20px",
                  }}
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: " 100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
  },
  notification: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DoctorSpecialistNotification;
