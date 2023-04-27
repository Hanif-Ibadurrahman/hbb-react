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
	return apiWithToken.post(`/api/transaksi/pemeriksaan`, input);
};

export const getDetailServiceInspectionApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/pemeriksaan/${id}`);
};

export const updateServiceInspectionApi = (
	id: string,
	input: IUpdateServiceInspectionRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pemeriksaan/${id}`, input);
};

export const deleteServiceInspectionApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/pemeriksaan/${id}`);
};
