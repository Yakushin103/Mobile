import axios from "axios";

// eslint-disable-next-line no-undef
let isdev = process.env.NODE_ENV === "development";
const instance = axios.create({
  baseURL: isdev ? "http://localhost:3001" : "https://ptender.ru",
  timeout: 600000,
});

export const loginUserApi = async (data) => {
  return await instance
    .post("/api/auth/loginUser", data)
    .then((response) => response.data);
};

