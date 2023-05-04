import {
	IItemGetAllParams,
	ICreateItemRequest,
	IUpdateItemRequest,
} from "store/types/itemTypes";
import { apiWithToken } from ".";

export const getAllItemApi = (params?: IItemGetAllParams) => {
	return apiWithToken.get(`/api/master/item`, {
		params: params,
	});
};

export const getDetailItemApi = (id: number) => {
	return apiWithToken.get(`/api/master/item/${id}`);
};

export const createNewItemApi = (input: ICreateItemRequest) => {
	return apiWithToken.post(`/api/master/item`, input);
};

export const updateItemApi = (id: number, input: IUpdateItemRequest) => {
	return apiWithToken.put(`/api/master/item/${id}`, input);
};

export const deleteItemApi = (id: number) => {
	return apiWithToken.delete(`/api/master/item/${id}`);
};
