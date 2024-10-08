import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import "./Contact.css";
import {
  PiBatteryVerticalLowLight,
  PiTelegramLogoDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import customerService from "../../../Services/customer.service";
import { toast } from "react-toastify";
import { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
    if (messageError) {
      setMessageError("");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
    if (nameError) {
      setNameError("");
    }
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    if (phoneError) {
      setPhoneError("");
    }
  };

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
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
        valid = false;
      }
    }

    if (!name) {
      setNameError("Please enter your name");
      valid = false;
    } else {
      setNameError("");
    }
    if (!Phone) {
      setPhoneError("Please enter your phone number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!message) {
      setMessageError("Please enter your message");
      valid = false;
    } else {
      setMessageError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      email,
      name,
      message,
      phonenumber: Phone,
    };

    try {
      const response = await customerService.contact(formData);
      if (response.data.status === "SUCCESS") {
        setName("");
        setEmail("");
        setMessage("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred. Please try again later.");
    }
  };

  return (
    <section id="contact" className="contact section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Quick Contact</h2>
          <p className="text-center">
            If you have any inquiries, email us using the form and we will get
            back to you.
          </p>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-lg-10">
            <div className="info-wrap">
              <div className="row">
                {/* Location and Email (Left Column) */}
                <div className="col-lg-8">
                  <Link
                    target="_blank"
                    to="https://maps.app.goo.gl/nQtPJRHduCux3TNJ6"
                    className="info"
                  >
                    <i>
                      <IoLocationOutline />
                    </i>
                    <h4>Location:</h4>
                    <p>
                      Ag grace building 10th floor [ Edna mall to 22 road ]
                      Addis Ababa, Ethiopia
                    </p>
                  </Link>
                  <div className="info mt-4">
                    <Link
                      target="_blank"
                      to="mailto:info@blackrocksolutionsplc.com"
                    >
                      <i>
                        <TfiEmail />
                      </i>
                      <h4>Email:</h4>
                      <p>info@blackrocksolutionsplc.com</p>
                    </Link>
                    <Link
                      target="_blank"
                      to="mailto:sales@blackrocksolutionsplc.com"
                    >
                      <p>sales@blackrocksolutionsplc.com</p>
                    </Link>
                  </div>
                </div>

                {/* Call and Telegram (Right Column) */}
                <div className="col-lg-4 mt-4 mt-lg-0">
                  <Link to="tel:8828" className="info mt-4 mt-lg-0">
                    <i>
                      <PiBatteryVerticalLowLight />
                    </i>
                    <h4>Call:</h4>
                    <p>+8828</p>
                    <p>[works 24/7]</p>
                  </Link>
                  <Divider sx={{ margin: 2 }} />
                  <Link
                    to="https://t.me/infoblackrock"
                    target="_blank"
                    className="info mt-4 mt-lg-0"
                  >
                    <i>
                      <PiTelegramLogoDuotone />
                    </i>
                    <h4>Telegram:</h4>
                    <p>@infoblackrock</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row mt-5 justify-content-center">
          <div className="col-lg-10">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                {/* Name Input */}

                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleName}
                    value={name}
                    id="name"
                    placeholder="Your Name"
                  />
                  {nameError && (
                    <div style={{ color: "red" }} className="err-message">
                      {nameError}
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleEmail}
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                  />
                  {emailError && (
                    <div style={{ color: "red" }}>{emailError}</div>
                  )}
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="number"
                    className="form-control"
                    onChange={handlePhone}
                    value={Phone}
                    name="phone"
                    id="phone"
                    placeholder="Your Phone Number"
                  />
                  {phoneError && (
                    <div style={{ color: "red" }}>{phoneError}</div>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  onChange={handleMessage}
                  value={message}
                  rows="5"
                  placeholder="Message"
                ></textarea>
                {messageError && (
                  <div style={{ color: "red" }}>{messageError}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  style={{
                    backgroundColor: "#3368C6",
                    borderRadius: "20px",
                  }}
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
