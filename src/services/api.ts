import axios from "axios";
import { apiUrl } from "../environments/environment";

export const api = axios.create({
    baseURL: apiUrl.blue,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});