import { Link } from "react-router-dom";
function AllSpecialistResponse() {
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
        }}
      >
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/responsetodoctor">
            Response to Doctor
          </Link>
        </li>
      </button>

      <button style={{ backgroundColor: "#3368c6",padding:"10px 60px" }}>
        <li style={{ listStyleType: "none" }} className="link">
          <Link
            className="nav-link scrollto"
            to="/specialistdoctorforrecommendation"
          >
            Diagnosis
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllSpecialistResponse;
