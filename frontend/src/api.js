import axios from "axios";

const api = axios.create({
  baseURL: "https://aashwashan-app-1.onrender.com",
});

export default api;