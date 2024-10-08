import "./Contact.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    const toastId = toast.loading("Sending Email...");
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n4miswv",
        "template_pe5x03s",
        form.current,
        "-r0Pp-cWDYzL5nlcf"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset(); // Use form reference to reset the form
          toast.dismiss(toastId);
          toast.success("Email sent successfully");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.dismiss(toastId);
          toast.error("Failed to send email");
        }
      );
  };

  return (
    <div className="containercontact">
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>
            <div className="topic">Address</div>
            <div className="text-one">Addis Ababa</div>
            <div className="text-two">Ethiopia</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Phone</div>
            <div className="text-one">+251976640598</div>
            <div className="text-two">+25189423573</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">Email</div>
            <div className="text-one">hamzaosi442@gmail.com</div>
            <div className="text-two">tumornoreply@gmail.com</div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>
            If you have any work from me or any types of queries related to my
            tutorial, you can send me a message from here. It's my pleasure to
            help you.
          </p>
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-box">
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-box">
              <textarea
                type="text"
                name="message"
                placeholder="Enter your Message"
              />
            </div>
            <div className="input-box message-box"></div>
            <div className="button">
              <input
                type="submit"
                value="Send"
                style={{
                  backgroundColor: "#3368C6",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  outline: "none",
                  border: "none",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
