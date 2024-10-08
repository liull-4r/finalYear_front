import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "./DoctorRadiologistForm.css";

const DoctorRadiologistForm = () => {
  const location = useLocation();
  const { radiologistIdK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;

  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    notes: "",
    patient_id: "",
    doctor_id: doctorId,
    radiologist_id: radiologistIdK,
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data Please Wait...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/doctorradiologist/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Posted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="patient_id">Patient:</label>
          <select
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.patient} value={patient.patient}>
                {patient.patient_first_name} {patient.patient_last_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#3368C6",
            borderRadius: "20px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorRadiologistForm;
