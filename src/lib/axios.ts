import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",

  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(

  (config) => {

    // GET TOKEN
    const token =
      localStorage.getItem("token");

    // ATTACH TOKEN
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;