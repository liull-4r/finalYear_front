import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../../../util/Auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await fetch(
          "http://localhost:9000/detection/customers/me/",
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        // setIsLogged(true);
        // setIsChecked(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // setIsChecked(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response) {
        setIsLogged(true);
        if (roles && roles.length > 0 && roles.includes(userData.role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [userData, roles]);

  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};

export default PrivateAuthRoute;
