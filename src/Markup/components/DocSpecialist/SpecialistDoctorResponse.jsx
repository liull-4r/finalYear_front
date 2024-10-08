import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const SpecialistDoctorResponse = () => {
  const location = useLocation();
  const { doctorIdK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const specialistId = user?.user_id;
  const [formData, setFormData] = useState({
    message: "",
    specialist: null,
    doctor: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  formData.specialist = specialistId;
  formData.doctor = doctorIdK;
  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting Response ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/specialistdoctorresponse/",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Response posted successfully");
      toast.dismiss(toastId);
      // Do something with the response if needed
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Specialist Doctor Response</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="message" style={styles.label}>
            Message:
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default SpecialistDoctorResponse;
