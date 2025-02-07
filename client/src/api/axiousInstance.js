import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://contact-me-jjnm.onrender.com/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const anonymousId = localStorage.getItem("anonymousId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (anonymousId) {
      config.headers["anonymous-id"] = anonymousId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
