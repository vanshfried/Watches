// userapi.js - API functions for public user operations (products only)

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

/* ==============================
   PUBLIC PRODUCTS
============================== */

// Get all products
export const getAllProducts = () => {
  return API.get("/products");
};

// Get single product by ID
export const getSingleProduct = (id) => {
  return API.get(`/products/${id}`);
};

export default API;
