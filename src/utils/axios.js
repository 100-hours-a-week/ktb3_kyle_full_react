import axios from "axios";
import { API_URL } from "./Config.js";

let csrfToken = null;
let csrfPromise = null;
const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

async function ensureCsrfToken() {
    if (csrfToken) return csrfToken;

    if (!csrfPromise) {
        csrfPromise = api
            .get("/csrf")
            .then(() => {
                csrfToken = getCookie("XSRF-TOKEN") || null;
                return csrfToken;
            })
            .finally(() => {
                csrfPromise = null;
            });
    }

    return csrfPromise;
}

export function clearCsrfToken() {
    csrfToken = null;
    csrfPromise = null;
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
});

api.interceptors.request.use(async (config) => {
    if (unsafeMethods.has((config.method || "").toLowerCase())) {
        const token = await ensureCsrfToken();
        if (token && !config.headers["X-XSRF-TOKEN"]) {
            config.headers["X-XSRF-TOKEN"] = token;
        }
    }
    return config;
});

