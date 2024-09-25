import { jwtDecode } from "jwt-decode";

export const decodedUser = (token) => {
  const decoded = jwtDecode(token);
  return {
    token: token,
    userName: decoded.userName,
    role: decoded.role,
  };
};
