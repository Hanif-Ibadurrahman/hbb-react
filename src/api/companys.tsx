import { identity } from "lodash";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";
import api from "./dox";
export const create = async (data: CompanyInterfaceState) => {
	// console.log("create api", data);

	let payload = {
		// code_company: data.CodeCompany,
		name: data.CodeName,
		location: data.CodeLocation,
		latitude: data.CodeLatitude,
		longitude: data.CodeLongitude,
		is_agree: data.CodeAgree,
		// created_at: data.CodeCreatedate,
		// updated_at: data.CodeUpdatedate,
	};
	console.log("payload", payload);

	return await api.post("/companies", payload);
};

export const update = async (data: CompanyInterfaceState) => {
	let id = data.Id;
	let payload = {
		// code_company: data.CodeCompany,
		name: data.CodeName,
		location: data.CodeLocation,
		latitude: data.CodeLatitude,
		longitude: data.CodeLongitude,
		is_agree: data.CodeAgree,
		// created_at: data.CodeCreatedate,
		// updated_at: data.CodeUpdatedate,
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
