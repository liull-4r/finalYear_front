import { Link } from "react-router-dom";

function AllDoctorUpload() {
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
          backgroundColor: "#3368c6",
          padding: "10px 30px",
        }}
      >
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/radiologistlists">
            Refer to Radiologist
          </Link>
        </li>
      </button>

      <button style={{ backgroundColor: "#3368c6", padding: "10px 38px" }}>
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/posttospecialistdata">
            Consult Specialist
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorUpload;
