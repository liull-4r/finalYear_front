// src/MedicalRecordsForm.js
import { useState } from "react";
import axios from "axios";
import "./MedicalRecordsForm.css"; // Custom CSS
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const MedicalRecordsForm = () => {
  const location = useLocation();
  const { customerIDK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;
  const [formData, setFormData] = useState({
    weight: "",
    systolic_blood_pressure: "",
    diastolic_blood_pressure: "",
    blood_sugar_level: "",
    heart_rate: "",
    cholesterol_level: "",
    doctor_notes: "",
    doctor: "",
    patient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  formData.doctor = doctorId;
  formData.patient = customerIDK;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("posting medical record ...");
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/medicalrecords/",
        formData
      );
      console.log("Data submitted successfully:", response.data);
      toast.success("posted successful");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data");
      toast.dismiss(toastId);
    }
  };

  return (
    <form
      style={{ marginTop: "150px" }}
      className="container"
      onSubmit={handleSubmit}
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Weight:</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Systolic Blood Pressure:</label>
          <input
            type="text"
            className="form-control"
            name="systolic_blood_pressure"
            value={formData.systolic_blood_pressure}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Diastolic Blood Pressure:</label>
          <input
            type="text"
            className="form-control"
            name="diastolic_blood_pressure"
            value={formData.diastolic_blood_pressure}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Blood Sugar Level:</label>
          <input
            type="text"
            className="form-control"
            name="blood_sugar_level"
            value={formData.blood_sugar_level}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Heart Rate:</label>
          <input
            type="text"
            className="form-control"
            name="heart_rate"
            value={formData.heart_rate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Cholesterol Level:</label>
          <input
            type="text"
            className="form-control"
            name="cholesterol_level"
            value={formData.cholesterol_level}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label>Doctor diagnosis & Treatment Plan:</label>
        <textarea
          className="form-control"
          name="doctor_notes"
          value={formData.doctor_notes}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary custom-submit">
        Submit
      </button>
    </form>
  );
};

export default MedicalRecordsForm;
