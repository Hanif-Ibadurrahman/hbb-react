import api from "./dox";
import { LoginInterfaceState } from "store/Types/LoginTypes";
import { DataTable } from "app/components/Datatables";

export const login = async (data: LoginInterfaceState) => {
	let payload = {
		username: data.username,
		password: data.password,
		token: data.token,
		data: data.data,
	};
	return api.post("/login", payload);
};
