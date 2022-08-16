import { identity } from "lodash";
import { CustomerInterfaceState } from "store/Types/CustomerTypes";
import api from "./dox";
export const create = async (data: CustomerInterfaceState) => {
	let payload = {
		username: data?.username,
		password: data?.password,
		name: data?.name,
		email: data?.email,
		phone: data?.phone,
		location: data?.location,
		company_id: data?.company?.id,
		division_id: data?.division_id?.id,
	};
	return api.post("/users/customer", payload);
};

export const update = async (data: CustomerInterfaceState) => {
	let id = data.id;
	let payload = {
		// username: data?.username,
		// password: data?.password,
		name: data?.name,
		email: data?.email,
		phone: data?.phone,
		location: data?.location,
		company_id: data?.company?.id,
		division_id: data?.division_id?.id ?? data?.division?.id,
	};
	return api.put(`/users/customer/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/users/customer/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/users?role=customer&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/users/customer/${id}`);
};
