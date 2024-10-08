import { useState } from "react";
import axios from "axios";
import "./UserProfile.css"; // Import the CSS file for styling
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function PostAdditional() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const [, setLoading] = useState(false); // New loading state
  const [userData, setUserData] = useState({
    // id: null,
    weight: "",
    systolic_blood_pressure: "",
    diastolic_blood_pressure: "",
    blood_sugar_level: "",
    user: "",
    document: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("posting  Profile ...");

    let form_data = new FormData();
    //  form_data.append("image", formData.image);
    form_data.append("weight", userData.weight);
    form_data.append(
      "systolic_blood_pressure",
      userData.systolic_blood_pressure
    );
    form_data.append(
      "diastolic_blood_pressure",
      userData.diastolic_blood_pressure
    );
    form_data.append("blood_sugar_level", userData.blood_sugar_level);
    form_data.append("odf_file", userData.document);
    form_data.append("user", user?.user_id);
    let url = "http://localhost:9000/detection/info/";

    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("User data posted successfully:", response.data);
        toast.success("posted successful");
        navigate("/appointement-list");
        toast.dismiss(toastId); // Reset form after successful submission
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error posting user data:", error);
        toast.error("An error has occurred. Please try again later.");
        toast.dismiss(toastId);
        setLoading(false);
      });
  };

  return (
    <div className="containerone" style={{ marginTop: "5rem" }}>
      <h2>User Profile</h2>

      <h3>Additional Information Used for health information</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleInputChange} // Add onChange handler here
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Systolic Blood Pressure:</label>
          <input
            type="number"
            name="systolic_blood_pressure"
            value={userData.systolic_blood_pressure}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Diastolic Blood Pressure:</label>
          <input
            type="number"
            name="diastolic_blood_pressure"
            value={userData.diastolic_blood_pressure}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Blood Sugar Level:</label>
          <input
            type="number"
            name="blood_sugar_level"
            value={userData.blood_sugar_level}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div>
          <label>Upload Any Previous Health Documents</label>
          <input
            required=""
            type="file"
            id="image"
            accept="pdf"
            onChange={handleFileChange}
            className="input"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post Profile
        </button>
      </form>
    </div>
  );
}

export default PostAdditional;
