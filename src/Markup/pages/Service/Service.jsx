
const Service = ({ title, description }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

// Styles
const styles = {
    container: {
      
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    color: "#333",
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    color: "#666",
    fontSize: "1.1em",
  },
};

export default Service;
