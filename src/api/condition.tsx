import {
	IConditionGetAllParams,
	ICreateConditionRequest,
	IUpdateConditionRequest,
} from "store/types/conditionTypes";
import { apiWithToken } from "./dox";

export const getAllConditionApi = (params?: IConditionGetAllParams) => {
	return apiWithToken.get(`/api/master/condition`, {
		params: params,
	});
};

export const createNewConditionApi = (input: ICreateConditionRequest) => {
	return apiWithToken.post(`/api/master/condition`, input);
};
export const getDetailConditionApi = (id: string) => {
	return apiWithToken.get(`/api/master/condition/${id}`);
};

export const updateConditionApi = (
	id: string,
	input: IUpdateConditionRequest,
) => {
	return apiWithToken.put(`/api/master/condition/${id}`, input);
};
