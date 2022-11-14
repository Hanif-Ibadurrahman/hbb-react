import { identity } from "lodash";
import { useHistory } from "react-router-dom";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import api from "./dox";
export const create = async (data: BoxInterfaceState) => {
	let payload = {
		code_box: data.code_box,
		company_id: data.company.id,
	};
	return api.post("/boxes", payload);
};

export const update = async (data: BoxInterfaceState) => {
	let id = data.id;
	let payload = {
		code_box: data.code_box,
		company_id: data.company.id,
	};
	return await api.put(`/boxes/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/boxes/${id}`);
};

export const getAll = async (
	page,
	company_id: String | null = null,
	data: BoxInterfaceState | null = null,
) => {
	return api
		.get(`/boxes?`, {
			params: {
				is_filled: data?.is_filled ? data?.is_filled : undefined,
				page: page,
				company_id: company_id || data?.company?.id,
				code_box: data?.code_box,
				custom_code_box: data?.custom_code_box,
				division_id: data?.division?.id,
				implementer_code: data?.implementer_code,
			},
		})
		.then(res => {
			if (res.status === 401) {
				return localStorage.clear();
			} else {
				return res.data;
			}
		})
		.catch(error => {
			return error;
		});
};

export const getAllNotPage = async params => {
	return api
		.get(`/boxes?per_page=999999999`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterBoxes = async (data: BoxInterfaceState) => {
	let filter = {
		code: data.code_box,
		altCode: data.custom_code_box,
	};

	if (
		(filter.code !== undefined && filter.code !== "") ||
		(filter.altCode !== undefined && filter.altCode !== "")
	) {
		return api
			.get(`/boxes?code_box=${filter.code}&custom_code_box=${filter.altCode}`)
			.then(res => {
				return res.data;
			})
			.catch(error => {
				return error;
			});
	} else {
		return api
			.get(`/boxes`)
			.then(res => {
				return res.data;
			})
			.catch(error => {
				return error;
			});
	}
};

export const destroy = id => {
	return api.delete(`/boxes/${id}`);
};
