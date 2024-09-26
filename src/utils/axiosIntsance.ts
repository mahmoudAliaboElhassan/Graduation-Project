// utils/axiosInstance.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Define your Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL, // Set your API base URL here
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

// Define a function to handle request interception
const handleRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  //   const token =
  //     typeof window !== "undefined" ? localStorage.getItem("token") : null; // Use localStorage only on client side
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  console.log("config", config);
  return config;
};

// Define a function to handle request errors
const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  // Handle the request error
  console.log(error);
  return Promise.reject(error);
};

// Define a function to handle response interception
const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// Define a function to handle response errors
const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  if (error.response?.status === 401) {
    // Handle unauthorized errors (e.g., redirect to login)
  }
  return Promise.reject(error);
};

// Add request and response interceptors
axiosInstance.interceptors.request.use(handleRequest, handleRequestError);
axiosInstance.interceptors.response.use(handleResponse, handleResponseError);

export default axiosInstance;
