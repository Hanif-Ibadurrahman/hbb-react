import {
	IServiceInspectionGetAllParams,
	ICreateServiceInspectionRequest,
	IUpdateServiceInspectionRequest,
} from "store/types/serviceInspectionTypes";
import { apiWithToken } from ".";

export const getAllServiceInspectionApi = (
	params?: IServiceInspectionGetAllParams,
) => {
	return apiWithToken.get(`/api/master/service-inspection`, {
		params: params,
	});
};

export const createNewServiceInspectionApi = (
	input: ICreateServiceInspectionRequest,
) => {
	return apiWithToken.post(`/api/master/service-inspection`, input);
};

export const getDetailServiceInspectionApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-inspection/${id}`);
};

export const updateServiceInspectionApi = (
	id: string,
	input: IUpdateServiceInspectionRequest,
) => {
	return apiWithToken.put(`/api/master/service-inspection/${id}`, input);
};

export const deleteServiceInspectionApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-inspection/${id}`);
};
