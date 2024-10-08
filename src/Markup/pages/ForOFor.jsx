import { Link } from "react-router-dom";

function ForOFor() {
  return (
    <div>
      <h1 style={{ marginTop: "100px", textAlign: "center" }}>
        The Page You Are Looking For Is Not Found
      </h1>

      <h1 style={{ marginTop: "10px", textAlign: "center" }}>
        {" "}
        <Link to="/" style={{ textDecoration: "none", color: "red" }}>
          Click Here To Go Back
        </Link>{" "}
      </h1>
    </div>
  );
}

export default ForOFor;
