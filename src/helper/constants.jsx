import axios from "axios";

export const VITE_DOMAIN = import.meta.env.VITE_DOMAIN;
export const VITE_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const PAGE_URL = axios.create({
    baseURL: import.meta.env.VITE_PAGE_URL
})