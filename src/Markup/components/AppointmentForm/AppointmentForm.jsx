import { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentForm.css"; // Import custom styles
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function AppointmentForm() {
  const [, setLoading] = useState(false); // New loading state
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const specialistId = user?.user_id;
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    appointment_datetime: "",
    notes: "",
    patient_id: "",
    specialist_id: specialistId,
  });
  const [error, setError] = useState("");

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
  }, [specialistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("Creating Appointment ...");

    try {
      // Validate form data
      if (!formData.appointment_datetime || !formData.patient_id) {
        setError("All fields are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/detection/appointments/",
        formData
      );

      if (response.status === 201) {
        toast.success("Appointment Created successfully");
        toast.dismiss(toastId);
        setFormData({
          appointment_datetime: "",
          notes: "",
          patient_id: "",
          specialist_id: specialistId,
        });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("An error occurred while creating the appointment.");
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="appointment_datetime"
            value={formData.appointment_datetime}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Patient:</label>
          <select
            name="patient_id"
            value={formData.patient_id}
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
          style={{ backgroundColor: "#3368c6" }}
          type="submit"
          className="btn btn-primary"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
