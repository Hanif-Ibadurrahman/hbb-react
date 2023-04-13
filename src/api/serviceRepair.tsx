import {
	IServiceRepairGetAllParams,
	ICreateServiceRepairRequest,
	IUpdateServiceRepairRequest,
} from "store/types/serviceRepairTypes";
import { apiWithToken } from ".";

export const getAllServiceRepairApi = (params?: IServiceRepairGetAllParams) => {
	return apiWithToken.get(`/api/master/service-repair`, {
		params: params,
	});
};

export const createNewServiceRepairApi = (
	input: ICreateServiceRepairRequest,
) => {
	return apiWithToken.post(`/api/master/service-repair`, input);
};

export const getDetailServiceRepairApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-repair/${id}`);
};

export const updateServiceRepairApi = (
	id: string,
	input: IUpdateServiceRepairRequest,
) => {
	return apiWithToken.put(`/api/master/service-repair/${id}`, input);
};

export const deleteServiceRepairApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-repair/${id}`);
};
