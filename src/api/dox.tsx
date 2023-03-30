import axios from "axios";

const token = sessionStorage.getItem("Token");

export const apiWithToken = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
	headers: { Authorization: "bearer " + token },
});

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
});
