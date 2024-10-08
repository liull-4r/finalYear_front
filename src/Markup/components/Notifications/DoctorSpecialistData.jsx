import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DoctorSpecialistData = () => {
  const location = useLocation();
  const { specialistIdK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;

  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    patient_id: null,
    doctor_id: doctorId,
    specialist_id: specialistIdK,
  });

  // Fetch patient data from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/getpatientsfrommedicalrecord/?doctor_id=${doctorId}`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients.");
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/doctorspecialistdata/",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Posted data successfully");
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
      <h2 style={styles.heading}>Send Patient Data</h2>
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
        <div style={styles.inputGroup}>
          <label htmlFor="patient_id" style={styles.label}>
            Patient:
          </label>
          <select
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.patient} value={patient.patient}>
                {patient.patient_first_name} {patient.patient_last_name}
              </option>
            ))}
          </select>
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
    maxWidth: "500px",
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

export default DoctorSpecialistData;
