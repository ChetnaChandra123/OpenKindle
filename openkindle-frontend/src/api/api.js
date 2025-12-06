import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  res => res,
  err => {
    // global 401 handling
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      // optional: redirect to login
    }
    return Promise.reject(err);
  }
);

export const fetchActivities = () => API.get("/activities");
export const fetchBooks = () => API.get("/books");
export const purchaseBook = (bookId) => API.post("/purchases", { bookId });
export const fetchMyBooks = () => API.get("/purchases/mybooks");

export default API;
