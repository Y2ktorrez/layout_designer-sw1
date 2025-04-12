import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // ajusta si usás otro puerto
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
