import { identity } from "lodash";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";
import api from "./dox";
export const create = async (data: CompanyInterfaceState) => {
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
		service_type: data.service_types,
		amount_access: data.amount_access,
		is_agree: data.is_agree,
	};

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
		service_type: [
			{
				type: "box",
				value: data.service_types[0].value,
			},
			{
				type: "folder",
				value: data.service_types[1].value,
			},
			{
				type: "document",
				value: data.service_types[2].value,
			},
		],
		amount_access: data.amount_access,
		is_agree: true,
	};
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
