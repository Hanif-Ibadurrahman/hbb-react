import axios from "axios";
import { Login } from "actions/LoginAction";

const token = localStorage.getItem("Token");

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	// baseURL: "http://localhost:3333",
	headers: { Authorization: "Bearer " + token },
});
