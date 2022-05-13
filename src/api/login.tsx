import api from "./dox";
import { LoginInterfaceState } from "store/Types/LoginTypes";

export const login = async (data: LoginInterfaceState) => {
	let payload = {
		username: data.username,
		password: data.password,
		token: data.token,
		data: data.data,
		roles: data.data.roles,
	};
	return api.post("/login", payload);
};
