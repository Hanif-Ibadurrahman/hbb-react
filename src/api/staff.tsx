import { identity } from "lodash";
import { StaffInterfaceState } from "store/Types/StaffTypes";
import api from "./dox";
export const create = async (data: StaffInterfaceState) => {
	let payload = {
		username: data?.username,
		password: data?.password,
		nik: data?.nik,
		name: data?.name,
		role_id: data?.role_id?.id,
		room_id: data?.room_id?.id,
	};
	return api.post("/users/staff", payload);
};

export const getAll = async params => {
	return api
		.get(`/users?role=staff&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterStaff = async (data: StaffInterfaceState) => {
	let filter = {
		username: data.username,
	};

	return api
		.get(`/users?role=staff&username=${filter.username}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/users/staff/${id}`);
};

export const getAllRole = () => {
	return api
		.get(`/roles`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
