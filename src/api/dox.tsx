import axios from "axios";
import { Login } from "actions/LoginAction";

const token = localStorage.getItem("Token");
console.log("token >>>", token);

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { Authorization: "Bearer " + token },
});
