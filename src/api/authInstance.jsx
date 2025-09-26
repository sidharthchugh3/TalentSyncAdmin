import axios from "axios";
import { APP_URL } from "./endpoint";

const authInstance = axios.create({
  baseURL: APP_URL,
  headers: { "Content-Type": "application/json" },
});
export default authInstance;