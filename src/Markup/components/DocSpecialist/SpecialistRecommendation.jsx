import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importing jwtDecode directly instead of destructuring

const SpecialistRecommendation = () => {
  const location = useLocation();
  const { doctorIdK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const specialistId = user?.user_id;
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    recommendation: "",
    specialist: specialistId,
    doctor: doctorIdK,
    patient: "", // Initialize patient as an empty string
  });

  // Fetch patient data from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/getpatientsfromdoctorspecialistdata/?specialist_id=${specialistId}`
        );

        // Filter to remove duplicates based on patient_id
        const uniquePatients = response.data.filter(
          (patient, index, self) =>
            index === self.findIndex((p) => p.patient_id === patient.patient_id)
        );

        setPatients(uniquePatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients.");
      }
    };

    fetchPatients();
  }, [specialistId]); // Adding specialistId as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting Recommendation ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/specialistrecommendation/",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Recommendation posted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Specialist Recommendation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <div style={styles.inputGroup}>
          <label htmlFor="recommendation" style={styles.label}>
            Diagnosis And Recommendation:
          </label>
          <input
            type="text"
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div className="form-group">
          <label>Patient:</label>
          <select
            name="patient" // Changed from "patient_id" to "patient"
            value={formData.patient}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.patient_first_name} {patient.patient_last_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          // style={styles.button}
          style={{
            backgroundColor: "#3368C6",
          }}
        >
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

export default SpecialistRecommendation;
