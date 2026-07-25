import axios from "axios";

export function login(data: any) {
  return axios.post(
    `${import.meta.env.VITE_API_URL.replace("/api", "")}/login`,
    data
  );
}