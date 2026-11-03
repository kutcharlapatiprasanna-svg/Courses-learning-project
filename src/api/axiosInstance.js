// import axios from "axios";
// import { setupInterceptors } from "./interceptors";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   timeout: 15000,
// });

// setupInterceptors(axiosInstance);

// export default axiosInstance;



import axios from "axios";
import { setupInterceptors } from "./interceptors";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://mockapi-mauve.vercel.app/api/v1"
    : "/api/v1");

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

setupInterceptors(axiosInstance);

export default axiosInstance;
