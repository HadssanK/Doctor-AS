// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // ✅ update if different
  withCredentials: true, // to handle cookies
});

export default axiosInstance;
