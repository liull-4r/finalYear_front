// import logoblack from "../../../assets/img/Custom/logoblack.png";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import loginService from "../../../Services/login.service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
function DoctorHeader() {
  // const navigate = useNavigate();
  const logOut = () => {
    loginService.Logout();
    setIsLogged(false);
    window.location.replace("/");
  };
  const { isLogged, setIsLogged } = useAuth();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const closeMenu = () => setShow(false);

  const handleLinkClick = () => {
    closeMenu();
    scrollToTop();
  };

  const navbarClassName = show
    ? "navbar-mobile"
    : "navbar order-last order-lg-0";

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto mt-1 d-flex align-items-center">
          {/* <Link onClick={scrollToTop} to="/">
            <img src={logoblack} alt="logo" loading="lazy" />
          </Link> */}
          <Link
            onClick={scrollToTop}
            className="logotext"
            style={{
              color: "rgb(39, 55, 70)",
              fontWeight: "600",
              marginLeft: "10px",
            }}
            to="/scan"
          >
            TUMOR TRACK
          </Link>
        </div>

        <nav id="navbar" className={navbarClassName}>
          <ul className="header">
            <IoCloseSharp onClick={handleShow} className="mobile-nav-toggle" />

            {/* <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/about"
              >
                About Us
              </Link>
            </li> */}
            {/* <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/service"
              >
                Service
              </Link>
            </li> */}

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/alldoctornotification"
              >
                Notifications
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/alldoctormessage"
              >
                Messages
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/alldoctorupload"
              >
                Upload
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/alldoctorrecord"
              >
                Medical Record
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/scan"
              >
                Scan
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/resources"
              >
                Resources
              </Link>
            </li>

            {/* <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/contact"
              >
                Contact
              </Link>
            </li> */}
            {isLogged ? (
              <li>
                <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/profile"
                >
                  <button
                    style={{
                      backgroundColor: "#3368C6",
                      borderRadius: "20px",
                    }}
                  >
                    Profile
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                {/* <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/register"
                >
                  <button
                    style={{
                      backgroundColor: "#3368C6",
                      borderRadius: "20px",
                    }}
                  >
                    Sign Up
                  </button>
                </Link> */}
              </li>
            )}
            {isLogged ? (
              <li>
                <Link
                  onClick={() => {
                    handleLinkClick();
                    logOut();
                  }}
                  className="nav-link scrollto"
                  to="/"
                >
                  <button
                    style={{
                      backgroundColor: "#3368C6",
                      borderRadius: "20px",
                    }}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                {/* <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/login"
                >
                  <button style={{ backgroundColor: "#3368C6" }}>Login</button>
                </Link> */}
              </li>
            )}
          </ul>
          <IoIosMenu onClick={handleShow} className="mobile-nav-toggle" />
        </nav>
      </div>
    </header>
  );
}

export default DoctorHeader;
