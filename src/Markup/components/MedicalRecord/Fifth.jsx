import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Remove curly braces

function PatientList() {
  const [customers, setCustomers] = useState([]);
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const doctorId = user?.user_id;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/getpatientsfrommedicalrecord/?doctor_id=${doctorId}`
        );
        console.log(response);
        if (response.data) {
          setCustomers(response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [doctorId]); // Add doctorId as a dependency to useEffect

  return (
    <section>
      <div style={{ marginTop: "100px" }} className="auto-container">
        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div style={{ textAlign: "center", margin: "0 auto" }}>
                  <h2>Patient List</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          {customers.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontSize: "25px",
                marginTop: "20px",
              }}
            >
              No patients available.
            </p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>City</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.patient_username}</td>
                    <td>{customer.patient_first_name}</td>
                    <td>{customer.patient_last_name}</td>
                    <td>{customer.patient_city}</td>
                    <td>{customer.patient_phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
}

export default PatientList;
