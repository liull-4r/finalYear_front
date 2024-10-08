import { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerProfile.css"; // Import the CSS file for styling
import { toast } from "react-toastify";
import { useUserRole } from "../../../context/AuthContext";
function CustomerProfileSetting() {
  const { userRole } = useUserRole();
  const [, setLoading] = useState(false); // New loading state
  const [customerData, setCustomerData] = useState({
    phone: "",
    city: "",
    gender: "Male",
    bio: "",
    image: null,
  });

  useEffect(() => {
    // Fetch customer data from the API
    axios
      .get("http://localhost:9000/detection/customers/me/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        const { phone, city, gender, bio, image } = response.data;
        setCustomerData({ phone, city, gender, bio, image });
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setCustomerData({ ...customerData, image: imageFile });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when submitting
    const toastId = toast.loading("Updating Profile ...");

    const formData = new FormData();
    formData.append("phone", customerData.phone);
    formData.append("city", customerData.city);
    formData.append("gender", customerData.gender);
    formData.append("bio", customerData.bio);
    formData.append("image", customerData.image);
    formData.append("role", userRole);

    try {
      const response = await axios.put(
        "http://localhost:9000/detection/customers/me/",
        formData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("Token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Customer data updated successfully:", response.data);
      toast.success("Updated successful");
      toast.dismiss(toastId); // Reset form after successful submission
      setLoading(false);
    } catch (error) {
      console.error("Error updating customer data:", error);
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="containerone">
      <div style={{ marginBottom: "10rem" }}>
        <div
          className="w-100 mb-3 rounded mb-5 p-2"
          style={{ background: "#f8f9fa" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={customerData.city}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={customerData.gender}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              {userRole == "Patient" ? (
                <label>Additional Information:</label>
              ) : (
                <label>Bio:</label>
              )}

              <textarea
                name="bio"
                value={customerData.bio}
                onChange={handleInputChange}
                className="form-control"
              ></textarea>
            </div>
            {userRole !== "Patient" ? (
              <div className="form-group">
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control-file"
                />
              </div>
            ) : (
              ""
            )}

            <button
              style={{
                backgroundColor: "#3368C6",
                // borderRadius: "20px",
              }}
              type="submit"
              className="btn btn-primary"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileSetting;
