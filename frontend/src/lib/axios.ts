import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REVLY_SERVER as string,
  withCredentials: true,
});
