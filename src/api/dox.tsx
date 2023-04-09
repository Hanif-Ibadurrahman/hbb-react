import axios from "axios";

const token = sessionStorage.getItem("Token");

export const apiWithToken = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { Authorization: "bearer " + token },
});

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
