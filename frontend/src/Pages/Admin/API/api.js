import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

/* ==============================
   ADMIN AUTH
============================== */
export const adminLogin = (data) => API.post("/admin/login", data);
export const adminLogout = () => API.post("/admin/logout");


/* ==============================
   ADMIN PRODUCTS (PROTECTED)
============================== */
export const createProduct = (data) =>
  API.post("/admin/products", data);

export const updateProduct = (id, data) =>
  API.put(`/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  API.delete(`/admin/products/${id}`);

/* Optional: Admin Dashboard View */
export const getAllProductsAdmin = () =>
  API.get("/admin/products");

export default API;
