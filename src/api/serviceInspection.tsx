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

export const getDetailServiceInspectionApi = (id: number) => {
	return apiWithToken.get(`/api/transaksi/pemeriksaan/${id}`);
};

export const updateServiceInspectionApi = (
	id: number,
	input: IUpdateServiceInspectionRequest,
) => {
	input = { ...input, _method: "PUT" };
	return apiWithToken.post(`/api/transaksi/pemeriksaan/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceInspectionApi = (id: number) => {
	return apiWithToken.delete(`/api/transaksi/pemeriksaan/${id}`);
};

export const approveServiceInspectionApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemeriksaan/approve/${id}`, input);
};

export const rejectServiceInspectionApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemeriksaan/reject/${id}`, input);
};
