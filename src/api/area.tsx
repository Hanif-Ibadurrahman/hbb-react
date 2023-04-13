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

export const getDetailAreaApi = (id: string) => {
	return apiWithToken.get(`/api/master/area/${id}`);
};

export const createNewAreaApi = (input: ICreateAreaRequest) => {
	return apiWithToken.post(`/api/master/area`, input);
};

export const updateAreaApi = (id: string, input: IUpdateAreaRequest) => {
	return apiWithToken.put(`/api/master/area/${id}`, input);
};
