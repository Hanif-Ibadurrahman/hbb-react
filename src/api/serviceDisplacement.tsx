import {
	IServiceDisplacementGetAllParams,
	ICreateServiceDisplacementRequest,
	IUpdateServiceDisplacementRequest,
} from "store/types/serviceDisplacementTypes";
import { apiWithToken } from ".";

export const getAllServiceDisplacementApi = (
	params?: IServiceDisplacementGetAllParams,
) => {
	return apiWithToken.get(`/api/master/service-displacement`, {
		params: params,
	});
};

export const createNewServiceDisplacementApi = (
	input: ICreateServiceDisplacementRequest,
) => {
	return apiWithToken.post(`/api/master/service-displacement`, input);
};

export const getDetailServiceDisplacementApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-displacement/${id}`);
};

export const updateServiceDisplacementApi = (
	id: string,
	input: IUpdateServiceDisplacementRequest,
) => {
	return apiWithToken.put(`/api/master/service-displacement/${id}`, input);
};

export const deleteServiceDisplacementApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-displacement/${id}`);
};
