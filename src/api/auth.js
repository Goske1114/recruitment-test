import axios from "./axios";

export const registerRequest = (data) => axios.post('/register', data)

export const loginRequest = (data) => axios.post('/login', data)

export const verifyTokenRequest = () => axios.get("/verify");

export const logoutRequest = () => axios.post("/logout");