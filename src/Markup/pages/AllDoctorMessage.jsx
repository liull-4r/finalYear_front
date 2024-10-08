import { Link } from "react-router-dom";

function AllDoctorMessage() {
  return (
    <div
      style={{
        marginTop: "100px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#3368C6",
          padding: "10px 43px",
        }}
      >
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/specialists">
            Send Request to Specialist
          </Link>
        </li>
      </button>
      <button
        style={{
          backgroundColor: "#3368C6",
          padding: "10px 50px",
        }}
      >
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/searchformessage">
            Send Message to Patient
          </Link>
        </li>
      </button>
      <button
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#3368C6",
          padding: "10px 15px",
        }}
      >
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/searchforrecommendation">
            Send Recommendation to Patient
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorMessage;
