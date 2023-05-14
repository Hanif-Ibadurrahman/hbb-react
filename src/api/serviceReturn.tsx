import {
	IServiceReturnGetAllParams,
	ICreateServiceReturnRequest,
	IUpdateServiceReturnRequest,
} from "store/types/serviceReturnTypes";
import { apiWithToken } from ".";

export const getAllServiceReturnApi = (params?: IServiceReturnGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/pengembalian`, {
		params: params,
	});
};

export const createNewServiceReturnApi = (
	input: ICreateServiceReturnRequest,
) => {
	return apiWithToken.post(`/api/transaksi/pengembalian`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceReturnApi = (id: number) => {
	return apiWithToken.get(`/api/transaksi/pengembalian/${id}`);
};

export const updateServiceReturnApi = (
	id: number,
	input: IUpdateServiceReturnRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pengembalian/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceReturnApi = (id: number) => {
	return apiWithToken.delete(`/api/transaksi/pengembalian/${id}`);
};

export const approveServiceReturnApi = (id: number) => {
	return apiWithToken.post(`/api/approval/pengembalian/approve/${id}`);
};

export const rejectServiceReturnApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pengembalian/reject/${id}`, input);
};
