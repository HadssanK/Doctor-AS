import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    console.log("🟡 Axios Request:", config.url);
    console.log("📦 Token Found:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🔴 Axios Response Error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
