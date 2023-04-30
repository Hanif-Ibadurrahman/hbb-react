import {
	IServiceChangeGetAllParams,
	ICreateServiceChangeRequest,
	IUpdateServiceChangeRequest,
} from "store/types/serviceChangeTypes";
import { apiWithToken } from ".";

export const getAllServiceChangeApi = (params?: IServiceChangeGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/perubahan`, {
		params: params,
	});
};

export const createNewServiceChangeApi = (
	input: ICreateServiceChangeRequest,
) => {
	return apiWithToken.post(`/api/transaksi/perubahan`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceChangeApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/perubahan/${id}`);
};

export const updateServiceChangeApi = (
	id: string,
	input: IUpdateServiceChangeRequest,
) => {
	return apiWithToken.put(`/api/transaksi/perubahan/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceChangeApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/perubahan/${id}`);
};

export const approveServiceChangeApi = (id: string) => {
	return apiWithToken.get(`/api/approval/perubahan/approve/${id}`);
};

export const rejectServiceChangeApi = (
	id: string,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/perubahan/reject/${id}`, input);
};
