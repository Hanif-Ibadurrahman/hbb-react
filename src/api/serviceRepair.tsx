import {
	IServiceRepairGetAllParams,
	ICreateServiceRepairRequest,
	IUpdateServiceRepairRequest,
} from "store/types/serviceRepairTypes";
import { apiWithToken } from ".";

export const getAllServiceRepairApi = (params?: IServiceRepairGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/perbaikan`, {
		params: params,
	});
};

export const createNewServiceRepairApi = (
	input: ICreateServiceRepairRequest,
) => {
	return apiWithToken.post(`/api/transaksi/perbaikan`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceRepairApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/perbaikan/${id}`);
};

export const updateServiceRepairApi = (
	id: string,
	input: IUpdateServiceRepairRequest,
) => {
	return apiWithToken.put(`/api/transaksi/perbaikan/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceRepairApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/perbaikan/${id}`);
};

export const approveServiceRepairApi = (id: string) => {
	return apiWithToken.get(`/api/approval/perbaikan/approve/${id}`);
};

export const rejectServiceRepairApi = (
	id: string,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/perbaikan/reject/${id}`, input);
};
