import {
	IServiceInspectionGetAllParams,
	ICreateServiceInspectionRequest,
	IUpdateServiceInspectionRequest,
} from "store/types/serviceInspectionTypes";
import { apiWithToken } from ".";

export const getAllServiceInspectionApi = (
	params?: IServiceInspectionGetAllParams,
) => {
	return apiWithToken.get(`/api/master/service-repair`, {
		params: params,
	});
};

export const createNewServiceInspectionApi = (
	input: ICreateServiceInspectionRequest,
) => {
	return apiWithToken.post(`/api/master/service-repair`, input);
};

export const getDetailServiceInspectionApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-repair/${id}`);
};

export const updateServiceInspectionApi = (
	id: string,
	input: IUpdateServiceInspectionRequest,
) => {
	return apiWithToken.put(`/api/master/service-repair/${id}`, input);
};

export const deleteServiceInspectionApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-repair/${id}`);
};
