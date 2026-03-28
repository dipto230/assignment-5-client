import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Enable credentials (cookies) for all requests
});

// Request interceptor - add token from localStorage if available
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Added Authorization header from localStorage");
    }
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.statusText;
    console.error(`❌ API Error [${status}]:`, message, error.response?.data);
    
    // Log for debugging
    if (status === 401) {
      const token = localStorage.getItem("accessToken");
      console.log("🔑 Token in localStorage:", token ? `${token.substring(0, 20)}...` : "NO TOKEN");
    }
    
    return Promise.reject(error);
  }
);