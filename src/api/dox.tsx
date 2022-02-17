import axios from "axios";
import { Login } from "actions/LoginAction";

const token = localStorage.getItem("Token");
console.log("token >>>", token);

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
