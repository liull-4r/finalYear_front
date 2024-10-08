import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Activation = () => {
  const [, setLoading] = useState(false);
  useEffect(() => {
    const activateAccount = async () => {
      setLoading(true);
      const toastId = toast.loading("Activating account...");
      try {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const uid = urlParts[urlParts.length - 2];
        const token = urlParts[urlParts.length - 1];

        const activationUrl = `http://localhost:9000/auth/users/activation/`;
        const data = { uid, token };
        const response = await axios.post(activationUrl, data);
        console.log(response);
        toast.dismiss(toastId);

        toast.success("Account Activated:");

        // Redirect to /login on successful activation
        window.location.replace("/login");
      } catch (error) {
        console.log("Activation Error:", error.response.data);
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, []);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "Poppins, sans-serif",
          fontSize: "2rem",
        }}
      >
        Please wait while we are Activating your Account...
      </h2>
      {/* You can add a loading spinner or message here */}
    </div>
  );
};

export default Activation;
