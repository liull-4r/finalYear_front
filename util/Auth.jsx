import { jwtDecode } from "jwt-decode";
const getAuth = async () => {
  const Token = localStorage.getItem("Token");
  if (Token) {
    const decodedToken = jwtDecode(Token);
    const userId = decodedToken.user_id;
    return userId;
  } else {
    return null;
  }
};
export default getAuth;
