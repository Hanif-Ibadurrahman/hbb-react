import { PaginationState } from "./paginationTypes";

export interface IServiceChange {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceChangePaginateResponse extends PaginationState {
	data: IServiceChange[];
}

export interface IServiceChangeGetAllParams {
	page?: number;
	page_size?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceChangeRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceChangeRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceChangeGetAllResponse {
	status: string;
	message: string;
	data: IServiceChangePaginateResponse | null;
}

export interface IServiceChangeInterfaceState {
	getAllServiceChangeWithPagination: IServiceChangePaginateResponse | null;
	title: string;
}

export type ServiceChangeContainerState = IServiceChangeInterfaceState;
