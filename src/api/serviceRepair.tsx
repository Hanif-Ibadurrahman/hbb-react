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
	return apiWithToken.post(`/api/transaksi/perbaikan`, input);
};

export const getDetailServiceRepairApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/perbaikan/${id}`);
};

export const updateServiceRepairApi = (
	id: string,
	input: IUpdateServiceRepairRequest,
) => {
	return apiWithToken.put(`/api/transaksi/perbaikan/${id}`, input);
};

export const deleteServiceRepairApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/perbaikan/${id}`);
};
