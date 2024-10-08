import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { FaHandPointUp } from "react-icons/fa";

function OrderListForm() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/patients/"
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
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearching(true);
    const filtered = customers.filter(
      (customer) =>
        customer.username.toLowerCase() === searchQuery.toLowerCase()
    );
    if (filtered.length === 0) {
      setNoResults(true);
      setFilteredCustomers([]);
    } else {
      setNoResults(false);
      setFilteredCustomers(filtered);
    }
  };

  const handleRowClick = (customerID) => {
    navigate("/record", { state: { customerIDK: customerID } });
  };

  return (
    <section>
      <div style={{ marginTop: "100px" }} className="auto-container">
        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="form-group col-md-7"
                >
                  <input
                    style={{ padding: "15px" }}
                    type="text"
                    name="search_name"
                    placeholder="Search for a Patient using User name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <IoIosSearch
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "20px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                    className="search"
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {searching && ( // Only render the table if searching is true
          <div className="table-responsive">
            {noResults ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  marginTop: "20px",
                }}
              >
                There is no patient found with the given user name.
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
                    <th>Choose</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.username}</td>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.city}</td>
                      <td>{customer.phone}</td>

                      <td>
                        <FaHandPointUp
                          onClick={() => handleRowClick(customer.user_id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderListForm;
