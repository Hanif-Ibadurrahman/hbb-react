import { identity } from "lodash";
import { StaffInterfaceState } from "store/Types/StaffTypes";
import api from "./dox";
export const create = async (data: StaffInterfaceState) => {
	let payload = {
		username: data?.username,
		password: data?.password,
		nip: data?.nip,
		name: data?.name,
		email: data?.email,
		role_id: data?.role_id?.id,
		room_id: data?.room_id?.id,
	};
	return api.post("/users/staff", payload);
};

export const update = async (data: StaffInterfaceState) => {
	let id = data?.id;
	let payload = {
		nip: data?.nip,
		name: data?.name,
		email: data?.email,
		role_id: data?.role_id?.id,
		room_id: data?.room_id?.id,
	};
	return api.put(`/users/staff/${id}`, payload);
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

export const getDetail = async params => {
	return api
		.get(`/users/staff/${params}`)
		.then(res => {
			console.log(res, "res resan");
			return res;
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
