import { PaginationState } from "./paginationTypes";

export interface IServiceRequest {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceRequestPaginateResponse extends PaginationState {
	data: IServiceRequest[];
}

export interface IServiceRequestGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceRequestRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceRequestRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceRequestGetAllResponse {
	status: string;
	message: string;
	data: IServiceRequestPaginateResponse | null;
}

export interface IServiceRequestInterfaceState {
	getAllServiceRequestWithPagination: IServiceRequestPaginateResponse | null;
	title: string;
}

export type ServiceRequestContainerState = IServiceRequestInterfaceState;
