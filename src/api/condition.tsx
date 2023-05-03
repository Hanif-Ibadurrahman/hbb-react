import {
	IConditionGetAllParams,
	ICreateConditionRequest,
	IUpdateConditionRequest,
} from "store/types/conditionTypes";
import { apiWithToken } from ".";

export const getAllConditionApi = (params?: IConditionGetAllParams) => {
	return apiWithToken.get(`/api/master/condition`, {
		params: params,
	});
};

export const createNewConditionApi = (input: ICreateConditionRequest) => {
	return apiWithToken.post(`/api/master/condition`, input);
};

export const getDetailConditionApi = (id: number) => {
	return apiWithToken.get(`/api/master/condition/${id}`);
};

export const updateConditionApi = (
	id: number,
	input: IUpdateConditionRequest,
) => {
	return apiWithToken.put(`/api/master/condition/${id}`, input);
};

export const deleteConditionApi = (id: number) => {
	return apiWithToken.delete(`/api/master/condition/${id}`);
};
