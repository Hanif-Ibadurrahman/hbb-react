import {
	IServiceRepairGetAllParams,
	ICreateServiceRepairRepair,
	IUpdateServiceRepairRepair,
} from "store/types/serviceRepairTypes";
import { apiWithToken } from ".";

export const getAllServiceRepairApi = (params?: IServiceRepairGetAllParams) => {
	return apiWithToken.get(`/api/master/service-request`, {
		params: params,
	});
};

export const createNewServiceRepairApi = (
	input: ICreateServiceRepairRepair,
) => {
	return apiWithToken.post(`/api/master/service-request`, input);
};

export const getDetailServiceRepairApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-request/${id}`);
};

export const updateServiceRepairApi = (
	id: string,
	input: IUpdateServiceRepairRepair,
) => {
	return apiWithToken.put(`/api/master/service-request/${id}`, input);
};

export const deleteServiceRepairApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-request/${id}`);
};
