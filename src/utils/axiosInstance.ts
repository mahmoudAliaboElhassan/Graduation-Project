import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// axios.defaults.withCredentials = true; // Enables cookies globally

// Define your Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set your API base URL here
  withCredentials: true, // Important: Sends cookies with requests

  // withCredentials: true: This is a crucial setting for cookies. When set to true, Axios will send cookies along with each request. Cookies are often used for authentication (e.g., JWT tokens stored in cookies). This setting ensures that cookies set by your server are sent along with every request to that server.

  // For example:

  // If you are logging in, your server might set a JWT token in a cookie.
  //  With withCredentials: true, each subsequent request will send
  //  this cookie automatically, allowing the server to verify the
  //  user's authentication.

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
  // any instead of  AxiosResponse as it returns only the data
  // not the full AxiosResponse object
  console.log("response is", response);
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
