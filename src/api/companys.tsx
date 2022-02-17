import { identity } from "lodash";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";
import api from "./dox";
export const create = async (data: CompanyInterfaceState) => {
	// console.log("create api", data);

	let payload = {
		name: data.name,
		location: data.location,
		latitude: data.latitude,
		longitude: data.longitude,
		person_responsible: data.person_responsible,
		npwp: data.npwp,
		email: data.email,
		phone: data.phone,
		address: data.address,
		service_type: data.service_type,
		amount_access: data.amount_access,
		is_agree: data.is_agree,
	};
	console.log("payload", payload);

	return await api.post("/companies", payload);
};

export const update = async (data: CompanyInterfaceState) => {
	let id = data.id;
	let payload = {
		name: data.name,
		location: data.location,
		latitude: data.latitude,
		longitude: data.longitude,
		person_responsible: data.person_responsible,
		npwp: data.npwp,
		email: data.email,
		phone: data.phone,
		address: data.address,
		service_type: data.service_type,
		is_agree: data.is_agree,
	};
	console.log(payload);
	return await api.put(`/companies/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/companies/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/companies?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/companies/${id}`);
};
