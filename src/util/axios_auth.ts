import axios from "axios";
import { Auth } from "aws-amplify";
import config from "../constants/config";

const axiosInstance = axios.create({
  baseURL: config.getBookingPath,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const idToken = user.signInUserSession.idToken.jwtToken;
      config.headers.Authorization = `${idToken}`;
    } catch (err) {
      console.error(err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
