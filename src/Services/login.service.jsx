import axios from "axios";

// A function to send the login request to the server
const logIn = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/auth/jwt/create/",
      formData
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const Forgot = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/auth/users/reset_password/",
      formData
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const Logout = () => {
  localStorage.removeItem("Token");
};

// Export the functions
const loginService = {
  logIn,
  Forgot,

  Logout,
};
export default loginService;
