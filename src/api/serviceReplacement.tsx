import {
	IServiceReplacementGetAllParams,
	ICreateServiceReplacementRequest,
	IUpdateServiceReplacementRequest,
} from "store/types/serviceReplacementTypes";
import { apiWithToken } from ".";

export const getAllServiceReplacementApi = (
	params?: IServiceReplacementGetAllParams,
) => {
	return apiWithToken.get(`/api/transaksi/penggantian`, {
		params: params,
	});
};

export const createNewServiceReplacementApi = (
	input: ICreateServiceReplacementRequest,
) => {
	return apiWithToken.post(`/api/transaksi/penggantian`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceReplacementApi = (id: number) => {
	return apiWithToken.get(`/api/transaksi/penggantian/${id}`);
};

export const updateServiceReplacementApi = (
	id: number,
	input: IUpdateServiceReplacementRequest,
) => {
	input = { ...input, _method: "PUT" };
	return apiWithToken.post(`/api/transaksi/penggantian/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceReplacementApi = (id: number) => {
	return apiWithToken.delete(`/api/transaksi/penggantian/${id}`);
};

export const approveServiceReplacementApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/penggantian/approve/${id}`, input);
};

export const rejectServiceReplacementApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/penggantian/reject/${id}`, input);
};
