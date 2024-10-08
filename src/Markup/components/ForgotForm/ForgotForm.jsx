import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginService from "../../../Services/login.service";
import { Helmet } from "react-helmet-async";
import "../LoginForm/LoginForm.css";
function ForgotForm() {
  const [loading, setLoading] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!valid) {
      return;
    }

    const formData = {
      email,
    };
    setLoading(true);
    const toastId = toast.loading("checking your email...");
    try {
      const response = await loginService.Forgot(formData);
      console.log(response);
      toast.success("Please check your email for further instructions");
      toast.dismiss(toastId);
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="Forgot your password? No worries! Reset your password quickly and securely. Enter your email to receive instructions on resetting your account password."
        />
        <link rel="canonical" href="forgot" />
      </Helmet>

      <div className="login">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container1">
          <div className="heading">Reset your password</div>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
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

            <span className="forgot-password">
              <Link onClick={scrollToTop} to="/login">
                Already Have an Account ?
              </Link>
            </span>
            <input
              className="login-button"
              type="submit"
              value="Reset Your Password"
            />
          </form>
         
        </div>
      </div>
    </>
  );
}

export default ForgotForm;
