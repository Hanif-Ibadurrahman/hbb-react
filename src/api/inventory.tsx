import {
	IInventoryGetAllParams,
	ICreateInventoryRequest,
	IUpdateInventoryRequest,
	ICheckSerialNumberParams,
	IInventoryInWarehouseParams,
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
	input = { ...input, _method: "PUT" };
	return apiWithToken.post(`/api/inventory/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteInventoryApi = (id: number) => {
	return apiWithToken.delete(`/api/inventory/${id}`);
};

export const getSerialNumberApi = (params?: ICheckSerialNumberParams) => {
	return apiWithToken.get(`/api/inventory/check-no-urut`, {
		params: params,
	});
};

export const getAllInventoryInWarehouseApi = (
	params?: IInventoryInWarehouseParams,
) => {
	return apiWithToken.get(`/api/master/get-inventory-in-gudang`, {
		params: params,
	});
};
