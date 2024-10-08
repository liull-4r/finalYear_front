import axios from "axios";
const contact = async (formData) => {
  try {
    const response = await axios.post("/customer/contact", formData);
    return response;
  } catch (error) {
    return error.response;
  }
};

const customerService = {
  contact,
};
export default customerService;
