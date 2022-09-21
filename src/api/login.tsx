import api from "./dox";
import { LoginInterfaceState } from "store/Types/LoginTypes";

export const login = async (data: LoginInterfaceState) => {
	let payload = {
		username: data.username,
		password: data.password,
		token: data.token,
		data: data.data,
		roles: data.data.roles[0] ? data.data.roles[0] : "",
		user: data?.data?.user?.staff
			? data?.data?.user?.staff?.name
			: data?.data?.user?.username,
	};
	return api.post("/login", payload);
};

export const reset = async (data: LoginInterfaceState) => {
	let payload = {
		email: data.email,
	};
	return api.post("/reset-password", payload);
};
