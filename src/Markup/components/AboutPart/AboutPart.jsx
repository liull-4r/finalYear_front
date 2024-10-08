import "./AboutUs.css"; // Make sure to create a corresponding CSS file for styling
const AboutPart = () => {
  return (
    <div className="about-us-section row">
      <div className="features col-lg-6 d-flex flex-column justify-content-center">
        <div className="feature">
          <h2>1</h2>
          <p>AI-Powered Detection</p>
        </div>
        <div className="feature">
          <h2>2</h2>
          <p>Quick and Accurate Results</p>
        </div>
        <div className="feature">
          <h2>3</h2>
          <p>User-Friendly Interface</p>
        </div>
        <div className="feature">
          <h2>4</h2>
          <p>Secure Data Handling</p>
        </div>
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
        <button className="read-more-button">Read More</button>
      </div>
    </div>
  );
};

export default AboutPart;











