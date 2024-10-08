import "./Footer.css"; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <div className="footer">
        <div className="newsletter">
          <h2>
            TUMOR <span className="highlight">TRACK</span>
          </h2>
          <p>
            To receive email releases, simply provide us with your email below
          </p>
          <div className="email-input">
            <input type="email" placeholder="Your email" />
            <button type="button">
              <i className="fa fa-envelope"></i>
            </button>
          </div>
          <div className="social-media">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-google"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
        <div className="contact-info">
          <h3>Our Contacts</h3>
          <hr />
          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <p>+251976640598</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <p>+251939325619</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <p>+251993656831</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
