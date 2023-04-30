import {
	IServiceInspectionGetAllParams,
	ICreateServiceInspectionRequest,
	IUpdateServiceInspectionRequest,
} from "store/types/serviceInspectionTypes";
import { apiWithToken } from ".";

export const getAllServiceInspectionApi = (
	params?: IServiceInspectionGetAllParams,
) => {
	return apiWithToken.get(`/api/transaksi/pemeriksaan`, {
		params: params,
	});
};

export const createNewServiceInspectionApi = (
	input: ICreateServiceInspectionRequest,
) => {
	return apiWithToken.post(`/api/transaksi/pemeriksaan`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceInspectionApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/pemeriksaan/${id}`);
};

export const updateServiceInspectionApi = (
	id: string,
	input: IUpdateServiceInspectionRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pemeriksaan/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceInspectionApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/pemeriksaan/${id}`);
};

export const approveServiceInspectionApi = (id: string) => {
	return apiWithToken.get(`/api/approval/pemeriksaan/approve/${id}`);
};

export const rejectServiceInspectionApi = (
	id: string,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemeriksaan/reject/${id}`, input);
};
