import loginService from "../../../Services/login.service";
import { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LoginForm = () => {
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
  // const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Trim the email and password values
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

    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("Logging in...");

    const formData = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    try {
      const response = await loginService.logIn(formData);
      console.log(response);
      const { access, user_role } = response.data; // Assuming accessToken is returned in response

      // Save access token to local storage
      localStorage.setItem("Token", access);
      console.log(user_role);
      if (user_role === "Patient") {
        toast.success("Login successful");
        toast.dismiss(toastId);
        window.location.replace("/doctors");
      } else if (user_role === "Doctor") {
        toast.success("Login successful");
        window.location.replace("/scan");
        toast.dismiss(toastId);
      } else if (user_role === "Receptionist") {
        toast.success("Login successful");
        window.location.replace("/add-patient");
        toast.dismiss(toastId);
      } else if (user_role === "Radiologist") {
        toast.success("Login successful");
        window.location.replace("/scan");
        toast.dismiss(toastId);
      } else if (user_role === "Specialist") {
        toast.success("Login successful");
        window.location.replace("/scan");
        toast.dismiss(toastId);
      } else {
        toast.error(response.data.detail);
        toast.dismiss(toastId);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
      // Navigate("/scan");
      toast.dismiss(toastId);
      // Set loading state to false after submission
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to access personalized services! Once logged in, we follow up on every application, ensuring your journey to success."
        />
        <link rel="canonical" href="login" />
      </Helmet>

      <div className="login">
        <div className="container1">
          <div className="heading">Login to your account</div>
          <form onSubmit={handleSubmit} className="form">
            <input
              required=""
              className="input"
              type="email"
              name="email"
              onChange={(e) => [setEmail(e.target.value), setEmailError("")]}
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
            <div className="password-container">
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
              value={loading ? "Loading..." : "Sign In"} // Change button text based on loading state
              disabled={loading} // Disable button when loading
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
          {/* <div
            className="agreement"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px", // Default gap
            }}
          >
            <p className="already-account-text">Do not have an account?</p>
            <p
              className="sign-in-link"
              style={{ cursor: "pointer", fontWeight: "bolder" }}
            >
              <Link onClick={scrollToTop} to="/register" className="login-link">
                Create Account
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
