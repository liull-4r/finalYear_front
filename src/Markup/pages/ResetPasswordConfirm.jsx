import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "../components/LoginForm/LoginForm.css";

function Reset() {
  const [, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { uid, token } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [errors, setErrors] = useState({
    new_password: "",
    re_new_password: "",
  });

  useEffect(() => {
    // Optionally, you can do something with uid and token here
    console.log("UID:", uid);
    console.log("Token:", token);
  }, [uid, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password validation
    if (formData.new_password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        new_password: "Password must be at least 6 characters",
      }));
      return;
    }

    if (formData.new_password !== formData.re_new_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        re_new_password: "Passwords do not match",
      }));
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Resetting password...");
    try {
      // Post request to reset password confirm
      const response = await axios.post(
        "http://localhost:9000/auth/users/reset_password_confirm/",
        { uid, token, ...formData }
      );
      console.log("Password reset confirm successful:", response);
      toast.success("Password reset successful. You can now login.");
      toast.dismiss(toastId);
      Navigate("/login");
    } catch (error) {
      toast.dismiss(toastId);
      // toast.error("An error has occurred. Please try again later.");
      toast.error(error.response.data.new_password[0]);
      console.log(error.response.data.new_password[0]);
      console.log("API Error:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="container1">
        <div className="heading">Rest Your Password</div>
        <form onSubmit={handleSubmit} className="form">
          <div className="password-container">
            <input
              required=""
              className="input password-input"
              type={showPassword ? "text" : "password"}
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              id="email"
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>

          {errors.new_password && (
            <div
              style={{ color: "red", textAlign: "end" }}
              className="error-message"
            >
              {errors.new_password}
            </div>
          )}

          <div className="password-container">
            <input
              required=""
              className="input password-input"
              type={showPassword ? "text" : "password"}
              name="re_new_password"
              id="password"
              value={formData.re_new_password}
              onChange={handleChange}
              placeholder="Confirm New Password"
              style={{ paddingRight: "50px" }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.re_new_password && (
            <div
              style={{ color: "red", textAlign: "end" }}
              className="error-message"
            >
              {errors.re_new_password}
            </div>
          )}
          <span className="forgot-password">
            <Link to="/login">Already Have an Account ?</Link>
          </span>
          <input
            className="login-button"
            type="submit"
            value="Reset Your Password"
          />
        </form>
      </div>
    </div>
  );
}

export default Reset;
