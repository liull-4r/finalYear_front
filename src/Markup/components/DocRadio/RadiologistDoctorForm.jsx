import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import "./RadiologistDoctorForm.css";

const RadiologistDoctorForm = () => {
  const location = useLocation();
  const { doctorIdK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const radiologistId = user?.user_id;
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    doctor: doctorIdK,
    patient: "",
    radiologist: radiologistId,
    recommendation: "",
    prediction: "",
    image: null,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/getpatientsfromradiologist/?radiologist_id=${radiologistId}`
        );

        // Create a Set to keep track of unique patient IDs
        const uniquePatientsSet = new Set();

        // Filter patients to only include unique ones
        const uniquePatients = response.data.filter((patient) => {
          if (uniquePatientsSet.has(patient.patient_id)) {
            return false;
          } else {
            uniquePatientsSet.add(patient.patient_id);
            return true;
          }
        });

        setPatients(uniquePatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients.");
      }
    };

    fetchPatients();
  }, [radiologistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data Please Wait...");
    e.preventDefault();
    const data = new FormData();
    data.append("doctor", formData.doctor);
    data.append("patient", formData.patient);
    data.append("radiologist", formData.radiologist);
    data.append("prediction", formData.prediction);
    data.append("recommendation", formData.recommendation);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:9000/detection/radiologistdoctor/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
          <label htmlFor="patient">Patient:</label>
          <select
            id="patient"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
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

        <div className="form-group">
          <label htmlFor="prediction">Diagnosis:</label>
          <textarea
            id="prediction"
            name="prediction"
            value={formData.prediction}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reccommendation">Recommendation:</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Mri Scan Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RadiologistDoctorForm;
