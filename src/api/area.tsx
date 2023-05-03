import {
	IAreaGetAllParams,
	ICreateAreaRequest,
	IUpdateAreaRequest,
} from "store/types/areaTypes";
import { apiWithToken } from ".";

export const getAllAreaApi = (params?: IAreaGetAllParams) => {
	return apiWithToken.get(`/api/master/area`, {
		params: params,
	});
};

export const getDetailAreaApi = (id: number) => {
	return apiWithToken.get(`/api/master/area/${id}`);
};

export const createNewAreaApi = (input: ICreateAreaRequest) => {
	return apiWithToken.post(`/api/master/area`, input);
};

export const updateAreaApi = (id: number, input: IUpdateAreaRequest) => {
	return apiWithToken.put(`/api/master/area/${id}`, input);
};

export const deleteAreaApi = (id: number) => {
	return apiWithToken.delete(`/api/master/area/${id}`);
};
