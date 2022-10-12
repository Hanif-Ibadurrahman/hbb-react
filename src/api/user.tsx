import { identity } from "lodash";
import api from "./dox";

export const getAllTransporter = async params => {
	return api
		.get(`/users?role=transporter&page=${params}`)
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

export const getAllArchiver = async params => {
	return api
		.get(`/users?role=archiver&page=${params}`)
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

export const getAllBoxNoAsign = async (
	page,
	company_id: String | null = null,
) => {
	return api
		.get(`/boxes?is_filled=false`, {
			params: {
				page: page,
				company_id: company_id,
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

export const resetPassword = async (payload: any) => {
	return api.patch(`/change-password`, payload);
};
