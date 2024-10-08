import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MRIUploadForm = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const location = useLocation();
  const { doctorIdK } = location.state;
  const [formData, setFormData] = useState({
    image: null,
  });
  const patientId = user?.user_id; // Fixed patient ID if user is not null
  const doctorId = doctorIdK; // Fixed doctor ID
  const [loading, setLoading] = useState(false);
  const [errors] = useState({});
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Uploading MRI scan...");
    try {
      const form_data = new FormData();
      form_data.append("image", formData.image);
      form_data.append("patient", patientId);
      form_data.append("doctor", doctorId);
      const response = await axios.post(
        "http://localhost:9000/detection/scans/",
        form_data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response.status == 201) {
        toast.success("MRI scan uploaded successfully");
        // navigate("/dashboard");
        navigate("/appointement-list");
        toast.dismiss(toastId);
      }
    } catch (error) {
      toast.error("Failed to upload MRI scan");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className="upload-form"
      style={{ marginTop: "100px", textAlign: "center" }}
    >
      <h2>Send MRI Scan Image To Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        {errors.image && <div className="error">{errors.image}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default MRIUploadForm;
