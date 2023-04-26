import { PaginationState } from "./paginationTypes";

export interface IServiceReturn {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceReturnPaginateResponse extends PaginationState {
	data: IServiceReturn[];
}

export interface IServiceReturnGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceReturnRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceReturnRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceReturnGetAllResponse {
	status: string;
	message: string;
	data: IServiceReturnPaginateResponse | null;
}

export interface IServiceReturnInterfaceState {
	getAllServiceReturnWithPagination: IServiceReturnPaginateResponse | null;
	title: string;
}

export type ServiceReturnContainerState = IServiceReturnInterfaceState;
