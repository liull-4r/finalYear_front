import "./AboutUs.css"; // Make sure to create a corresponding CSS file for styling
import about from "../../../assets/img/abouttwo.jpg";
const AboutPartTwo = () => {
  return (
    <div className="about-us-section row">
      <div className="features col-lg-6 d-flex flex-column justify-content-center">
        <img
          style={{ width: "100%", height: "700px", objectFit: "contain" }}
          src={about}
          alt=""
        />
      </div>
      <div className="about-us-content col-lg-6 align-items-center">
        <h1 style={{ fontSize: "36px", marginTop: "10px" }}>
          Welcome to Our
          <span className="highlight"> Brain Tumor Detection System</span>
        </h1>
        <p style={{ fontSize: "13px" }}>
          We are dedicated to revolutionizing healthcare through cutting-edge
          technology and compassionate care. Our team is committed to developing
          advanced solutions for early detection and accurate diagnosis of brain
          tumors, empowering patients and healthcare providers with the tools
          they need to make informed decisions and improve outcomes.
        </p>
        <ul>
          <li style={{ fontSize: "13px" }}>
            Ensures confident clinical decisions, precise results.
          </li>
          <li>Automates tasks, saves time, optimizes resources.</li>
          <li>Global reach, equitable healthcare access ensured.</li>
        </ul>
        <button style={{ marginTop: "30px" }} className="read-more-button">
          Read More
        </button>
      </div>
    </div>
  );
};

export default AboutPartTwo;
