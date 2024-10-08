import { useState } from "react";
import axios from "axios";
import "./RecommendationForm.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const RecommendationForm = () => {
  const location = useLocation();
  const { customerIDK } = location.state;
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;
  const [formData, setFormData] = useState({
    recommendation: "",
    doctor: doctorId,
    user: customerIDK,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting Recommendation ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/info/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Recommendation Posted successful");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Posting Recommendation Failed Please Try Again");
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recommendation">Recommendation:</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button
          type="submit"
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

export default RecommendationForm;
