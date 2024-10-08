import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./UpdateAvailability.css";

import { jwtDecode } from "jwt-decode";
const UpdateAvailability = () => {
  const token = localStorage.getItem("Token");
  const user = token ? jwtDecode(token) : null;
  const { id } = useParams();
  const [availability, setAvailability] = useState({
    doctor: user?.user_id,
    day: "",
    date: "",
    start_time: "",
    end_time: "",
    start_time_formatted: "",
    end_time_formatted: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/availability/${id}`
        );
        setAvailability(response.data);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError("Error fetching availability.");
        toast.error("Error fetching availability.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating Availability...");
    try {
      const response = await axios.put(
        `http://localhost:9000/detection/availability/${id}/`,
        availability
      );
      console.log("Availability updated successfully:", response.data);
      toast.success("Availability updated successfully");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error updating availability:", error);
      setError("Error updating availability.");
      toast.error("Error updating availability.");
      toast.dismiss(toastId);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-update">
      <h2>Update Availability</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="update-form">
        <div className="form-group">
          <label>Day:</label>
          <select
            name="day"
            value={availability.day}
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
            value={availability.date}
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
            value={availability.start_time}
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
            value={availability.end_time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAvailability;
