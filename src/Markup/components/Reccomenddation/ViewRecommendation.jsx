import { useEffect, useState } from "react";
import axios from "axios";

const ViewRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("Token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    // Make a GET request to the API endpoint
    axios
      .get("http://localhost:9000/detection/info/me/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        // Update the state with the fetched recommendations
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Recommendations</h1>

      {recommendations.length === 0 ? (
        <p>There are No recommendations found</p>
      ) : (
        <ul>
          {recommendations.map((recommendation) => (
            <li style={{ listStyleType: "none" }} key={recommendation.id}>
              <ul>
                <ol>{recommendation?.recommendation}</ol>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRecommendation;
