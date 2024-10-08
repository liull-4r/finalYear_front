import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AvailabilityForm.css"; // Import custom styles
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AvailabilityForm = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const user = token ? jwtDecode(token) : null;

  const [formData, setFormData] = useState({
    doctor: user?.user_id,
    day: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [error, setError] = useState("");
  const [, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("Submitting Availability...");

    try {
      const response = await axios.post(
        "http://localhost:9000/detection/availability/",
        formData
      );
      console.log("Availability submitted successfully:", response.data);
      toast.success("Availability Created successful");
      toast.dismiss(toastId); // Reset form after successful submission
      setFormData({
        doctor: "",
        day: "",
        date: "",
        start_time: "",
        end_time: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setError("An error occurred while submitting the form.");
      toast.update(toastId, {
        render: "An error occurred. Please try again later.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="containerava" style={{ marginTop: "100px" }}>
      <h2>Set Doctor Availability</h2>
      <form onSubmit={handleSubmit} className="availability-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Day:</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Day</option>
            <option value="MONDAY">Monday</option>
            <option value="TUESDAY">Tuesday</option>
            <option value="WEDNESDAY">Wednesday</option>
            <option value="THURSDAY">Thursday</option>
            <option value="FRIDAY">Friday</option>
            <option value="SATURDAY">Saturday</option>
            <option value="SUNDAY">Sunday</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button
        onClick={() => Navigate("/see-availability")}
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        view All availablity
      </button>
    </div>
  );
};

export default AvailabilityForm;
