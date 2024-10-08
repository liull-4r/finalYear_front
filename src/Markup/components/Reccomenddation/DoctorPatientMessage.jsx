import { useState } from "react";
import axios from "axios";
import "./DoctorPatientMessage.css"; // Import CSS file for styling
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
const DoctorPatientMessage = () => {
  const location = useLocation();
  const { customerIDK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending Message...");

    const data = {
      message,
      doctor: doctorId,
      patient: customerIDK,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/detection/doctorpatientmessage/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Message sent successfully");
        toast.dismiss(toastId);

        setMessage(""); // Clear the message input
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="doctor-patient-message">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#3368C6",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default DoctorPatientMessage;
