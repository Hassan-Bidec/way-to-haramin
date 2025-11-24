import axios from "axios";
import { useAuthStore } from "./useAuthStore";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// ⬇ Attach Token Automatically
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⬇ Handle Unauthorized (401) → Logout + Redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();

      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
