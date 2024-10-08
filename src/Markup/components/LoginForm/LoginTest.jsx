import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import loginService from "../../../Services/login.service";
import "./Login.css";
import "./LoginForm.css";

const LoginTest = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!trimmedEmail.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(trimmedEmail)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!trimmedPassword || trimmedPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging in...");

    const formData = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    try {
      const response = await loginService.logIn(formData);
      const { access, user_role } = response.data;
      localStorage.setItem("Token", access);

      if (user_role === "Patient") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/doctors");
      } else if (user_role === "Doctor") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/scan");
      } else if (user_role === "Receptionist") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/add-patient");
      } else if (user_role === "Radiologist") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/scan");
      } else if (user_role === "Specialist") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/scan");
      } else {
        toast.error(response.data.detail);
        toast.dismiss(toastId);
      }
    } catch (error) {
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="login-container">
      <div className="row no-gutters">
        <div className="col-md-6 bg-image">
          <div className="login-text">
            <h2 style={{ fontSize: "46px" }}>Welcome !</h2>
            <p>
              Access your tumor detection results, medical history, and
              personalized health recommendations. Your journey to better health
              starts here.
            </p>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  required=""
                  className="input"
                  type="email"
                  name="email"
                  onChange={(e) => [
                    setEmail(e.target.value),
                    setEmailError(""),
                  ]}
                  value={email}
                  id="email"
                  placeholder="E-mail"
                />
                {emailError && (
                  <div
                    style={{ color: "red", textAlign: "end" }}
                    className="error-message"
                  >
                    {emailError}
                  </div>
                )}
              </div>
              <div className="form-group password-input-wrapper">
                <label>Password</label>
                <input
                  required=""
                  className="input password-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => [
                    setPassword(e.target.value),
                    setPasswordError(""),
                  ]}
                  value={password}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-visibilityone"
                >
                  {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
              {passwordError && (
                <div
                  style={{ color: "red", textAlign: "end" }}
                  className="error-message"
                >
                  {passwordError}
                </div>
              )}

              <input
                className="login-button"
                type="submit"
                value={loading ? "Loading..." : "Sign In"}
                disabled={loading}
              />
            </form>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              className="forgot-password"
            >
              <Link to="/forgot">Forgot Password ?</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
