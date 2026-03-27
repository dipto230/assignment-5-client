import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://assignment-5-backend-nine.vercel.app",
  withCredentials: true,
});