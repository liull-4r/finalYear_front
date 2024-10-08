/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import "../LoginForm/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegistrationForm = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    city: "",
    gender: "",
    role: "",
    bio: "",
    username: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToReceive, setAgreedToReceive] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
    re_password: "",
    phone: "",
    city: "",
    gender: "",
    bio: "",
    image: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  // const handleImageChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     image: e.target.files[0],
  //   });
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const validateForm = () => {
    let valid = true;
    const {
      first_name,
      last_name,
      email,
      password,
      re_password,
      phone,
      city,
      gender,
      bio,
      username,
      role,
    } = formData;

    if (!agreedToReceive) {
      toast.error(
        "Please agree to receive notifications and emails to create an account"
      );
      valid = false;
    }

    if (!re_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        re_password: "Please confirm password",
      }));
      valid = false;
    }

    if (password !== re_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        re_password: "Passwords do not match",
      }));
      valid = false;
    }

    // Check if each field is empty and set error messages accordingly
    if (!first_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        first_name: "Please enter first name",
      }));
      valid = false;
    }

    if (!last_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        last_name: "Please enter last name",
      }));
      valid = false;
    }
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter user name",
      }));
      valid = false;
    }

    if (!email || !email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      valid = false;
    }

    if (!password || password.length < 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 4 characters long",
      }));
      valid = false;
    }

    if (!phone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter phone number",
      }));
      valid = false;
    }

    if (!bio) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bio: "Please enter bio",
      }));
      valid = false;
    }
    if (!role) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: "Please select role",
      }));
      valid = false;
    }

    if (!city) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        city: "Please enter city",
      }));
      valid = false;
    }

    if (!gender) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gender: "Please select gender",
      }));
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const trimmedFormData = Object.fromEntries(
    //   Object.entries(formData).map(([key, value]) => [key, value.trim()])
    // );
    setFormData(formData); // Update the state with trimmed values
    if (!validateForm()) return;
    // console.log(formData);
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      let form_data = new FormData();
      form_data.append("image", formData.image);
      form_data.append("first_name", formData.first_name);
      form_data.append("last_name", formData.last_name);
      form_data.append("email", formData.email);
      form_data.append("password", formData.password);
      form_data.append("role", formData.role);
      form_data.append("re_password", formData.re_password);
      form_data.append("username", formData.username);
      form_data.append("phone", formData.phone);
      form_data.append("city", formData.city);
      form_data.append("gender", formData.gender);
      form_data.append("bio", formData.bio);
      let url = "http://localhost:9000/auth/users/";
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 201) {
            toast.success(
              "Account created successfully activating  account please check email click on the activation link in your email"
            );
            Navigate("/login");
            toast.dismiss(toastId);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          toast.dismiss(toastId);
        });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      toast.dismiss(toastId);
      // toastFail(toastId, error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="container1">
        <div className="heading">Create Patient Account</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required=""
            className="input"
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Username"
          />
          {errors.username && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.username}
            </div>
          )}
          <br />
          <input
            required=""
            className="input"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="E-mail"
          />
          {errors.email && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.email}
            </div>
          )}

          <input
            required=""
            className="input"
            type="text"
            name="first_name" // Corrected name for first name
            onChange={handleChange}
            value={formData.first_name}
            placeholder="First name"
          />
          {errors.first_name && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.first_name}
            </div>
          )}
          <br />
          <input
            required=""
            className="input"
            type="text"
            name="last_name" // Corrected name for last name
            onChange={handleChange}
            value={formData.last_name}
            placeholder="Last name"
          />
          {errors.last_name && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.last_name}
            </div>
          )}

          <input
            required=""
            className="input"
            type="text"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone number"
          />
          {errors.phone && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.phone}
            </div>
          )}

          <div className="password-container">
            <input
              required=""
              className="input password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.password}
            </div>
          )}

          <br />

          <div className="password-container">
            <input
              required=""
              className="input password-input"
              type={showPassword ? "text" : "password"}
              name="re_password" // Change name to "re_password"
              onChange={handleChange}
              value={formData.re_password} // Change value to "formData.re_password"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.re_password && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.re_password}
            </div>
          )}
          <br />

          <select
            name="gender"
            className="input"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Please select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {errors.gender && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.gender}
            </div>
          )}

          <br />
          <select
            name="role"
            className="input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Please select role</option>
            <option value="Patient">Patient</option>
          </select>

          {errors.role && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.role}
            </div>
          )}
          <input
            required=""
            className="input"
            type="text"
            name="city"
            onChange={handleChange}
            value={formData.city}
            placeholder="Enter  City"
          />
          {errors.city && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.city}
            </div>
          )}
          <br />
          <br />

          {/* <Textarea required="" className="input" name="bio" onChange={handleChange} value={formData.bio} placeholder="Enter Your Bio">

          </Textarea> */}

          <textarea
            value={formData.bio} // Associate value with formData.bio
            onChange={handleChange} // Associate onChange with handleChange function
            className="input"
            placeholder="Enter Additional Information"
            name="bio" // Name attribute should match the key in formData state
          />

          {errors.bio && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.bio}
            </div>
          )}
          <br />

          {/* <input
            required=""
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="input"
          /> */}
          {/* {errors.image && (
            <div
              className="validation-error"
              style={{ color: "red", textAlign: "end" }}
            >
              {errors.image}
            </div>
          )} */}
          <br />
          <div className="agreed-to-receive">
            <input
              type="checkbox"
              id="agreedToReceive"
              name="agreedToReceive"
              checked={agreedToReceive}
              onChange={() => setAgreedToReceive(!agreedToReceive)}
            />
            <label htmlFor="agreedToReceive">
              I have agreed to receive notifications and emails regarding news,
              service updates, events, and related matters.
            </label>
          </div>

          <input
            style={{ backgroundColor: "#3368C6" }}
            className="login-button"
            type="submit"
            value={loading ? "Creating Account..." : "Create Account"}
            disabled={loading}
            onClick={scrollToTop}
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
