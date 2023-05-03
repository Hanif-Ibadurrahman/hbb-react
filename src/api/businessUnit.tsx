import {
	IBusinessUnitGetAllParams,
	ICreateBusinessUnitRequest,
	IUpdateBusinessUnitRequest,
} from "store/types/businessUnitTypes";
import { apiWithToken } from ".";

export const getAllBusinessUnitApi = (params?: IBusinessUnitGetAllParams) => {
	return apiWithToken.get(`/api/master/bisnis-unit`, {
		params: params,
	});
};

export const getDetailBusinessUnitApi = (id: number) => {
	return apiWithToken.get(`/api/master/bisnis-unit/${id}`);
};

export const createNewBusinessUnitApi = (input: ICreateBusinessUnitRequest) => {
	return apiWithToken.post(`/api/master/bisnis-unit`, input);
};

export const updateBusinessUnitApi = (
	id: number,
	input: IUpdateBusinessUnitRequest,
) => {
	return apiWithToken.put(`/api/master/bisnis-unit/${id}`, input);
};

export const deleteBusinessUnitApi = (id: number) => {
	return apiWithToken.delete(`/api/master/bisnis-unit/${id}`);
};
