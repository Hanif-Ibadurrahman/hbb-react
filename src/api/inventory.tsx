import {
	IInventoryGetAllParams,
	ICreateInventoryRequest,
	IUpdateInventoryRequest,
	ICheckSerialNumberParams,
} from "store/types/inventoryTypes";
import { apiWithToken } from ".";

export const getAllInventoryApi = (params?: IInventoryGetAllParams) => {
	return apiWithToken.get(`/api/inventory`, {
		params: params,
	});
};

export const createNewInventoryApi = (input: ICreateInventoryRequest) => {
	return apiWithToken.post(`/api/inventory`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailInventoryApi = (id: number) => {
	return apiWithToken.get(`/api/inventory/${id}`);
};

export const updateInventoryApi = (
	id: number,
	input: IUpdateInventoryRequest,
) => {
	return apiWithToken.put(`/api/inventory/${id}`, input);
};

export const deleteInventoryApi = (id: number) => {
	return apiWithToken.delete(`/api/inventory/${id}`);
};

export const getSerialNumberApi = (params?: ICheckSerialNumberParams) => {
	return apiWithToken.get(`/api/inventory/check-no-urut`, {
		params: params,
	});
};
