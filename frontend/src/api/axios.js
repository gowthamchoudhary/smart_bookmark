import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshRequest = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");
    const skipRefreshPaths = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/logout",
    ];
    const shouldSkipRefresh = skipRefreshPaths.includes(originalRequest?.url);

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      shouldSkipRefresh ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshRequest ??= axios.post(`${BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const { data } = await refreshRequest;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return Promise.reject(refreshError);
    } finally {
      refreshRequest = null;
    }
  },
);

export default apiClient;
