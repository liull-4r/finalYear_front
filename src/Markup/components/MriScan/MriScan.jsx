import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MriScan() {
  const [scanData, setScanData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/scans/${id}/`
        );
        setScanData(response.data);
      } catch (error) {
        console.error("Error fetching scan data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {scanData ? (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <h2>MRI Scan Images From Patient</h2>
          <img
            style={{ width: "500px", height: "500px", objectFit: "contain" }}
            src={scanData.image}
            alt="MRI Scan"
          />
          <br />
          <a
            href={scanData.image}
            download="MRI_Scan.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Image
          </a>
          <table
            style={{
              margin: "20px auto",
              borderCollapse: "collapse",
              border: "2px solid black",
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient First Name:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_first_name}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Last Name:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_last_name}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Phone:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_phone}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient City:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_city}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Weight:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_weight}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Diastolic Blood Pressure:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_diastolic_blood_pressure}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Systolic Blood Pressure:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_Systolic_blood_pressure}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Patient Blood Sugar Level:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {scanData.patient_blood_sugar_level}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MriScan;
