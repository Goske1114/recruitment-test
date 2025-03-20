import axios from "./axios";

export const getExoplanetsRequest = (page) => axios.get(`/Exoplanets/page/${page}`);
export const getExoplanetRequest = (id) => axios.get(`/Exoplanets/${id}`);
export const createExoplanetRequest = (Exoplanet) => axios.post("/Exoplanets", Exoplanet);
export const updateExoplanetRequest = (id, Exoplanet) => axios.put(`/Exoplanets/${id}`, Exoplanet);
export const deleteExoplanetRequest = (id) => axios.delete(`/Exoplanets/${id}`);
export const getExoplanetsCountRequest = () => axios.get("/Exoplanets/count")
