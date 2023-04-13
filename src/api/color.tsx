import {
	IColorGetAllParams,
	ICreateColorRequest,
	IUpdateColorRequest,
} from "store/types/colorTypes";
import { apiWithToken } from ".";

export const getAllColorApi = (params?: IColorGetAllParams) => {
	return apiWithToken.get(`/api/master/color`, {
		params: params,
	});
};

export const createNewColorApi = (input: ICreateColorRequest) => {
	return apiWithToken.post(`/api/master/color`, input);
};

export const getDetailColorApi = (id: string) => {
	return apiWithToken.get(`/api/master/color/${id}`);
};

export const updateColorApi = (id: string, input: IUpdateColorRequest) => {
	return apiWithToken.put(`/api/master/color/${id}`, input);
};

export const deleteColorApi = (id: string) => {
	return apiWithToken.delete(`/api/master/color/${id}`);
};
