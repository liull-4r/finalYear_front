import { Link } from "react-router-dom";

const EducationalResource = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Educational Resources</h1>
      <ul style={styles.list}>
        <li style={styles.linkItem}>
          <Link
            to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10289381/#:~:text=Of%20931%20children%20with%20brain,11%2F28"
            target="_blank"
            style={styles.link}
          >
            children with brain tumors
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link to="/chat" style={styles.link}>
            Brain Tumor Help Bot
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  heading: {
    color: "#333",
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  linkItem: {
    marginBottom: "10px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    borderBottom: "1px solid #007bff",
    transition: "color 0.3s",
    fontWeight: "bold",
  },
};

export default EducationalResource;
