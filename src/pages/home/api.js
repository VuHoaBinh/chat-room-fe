import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api/auth" });

export const registerForm = (formReData) => API.post("/register", formReData);
export const loginForm = (formData) => API.post("/login", formData);
