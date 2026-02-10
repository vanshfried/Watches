import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export const adminLogin = (data) => API.post("/admin/login", data);
export const adminLogout = () => API.post("/admin/logout");

export const createProduct = (data) => API.post("/admin/products", data);
export const getAllProducts = () => API.get("/admin/products");
export const getSingleProduct = (id) => API.get(`/admin/products/${id}`);
export const updateProduct = (id, data) =>
  API.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);

export default API;
