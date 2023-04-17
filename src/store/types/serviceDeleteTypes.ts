import { PaginationState } from "./paginationTypes";

export interface IServiceDelete {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceDeletePaginateResponse extends PaginationState {
	data: IServiceDelete[];
}

export interface IServiceDeleteGetAllParams {
	page?: number;
	page_size?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceDeleteRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceDeleteRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceDeleteGetAllResponse {
	status: string;
	message: string;
	data: IServiceDeletePaginateResponse | null;
}

export interface IServiceDeleteInterfaceState {
	getAllServiceDeleteWithPagination: IServiceDeletePaginateResponse | null;
	title: string;
}

export type ServiceDeleteContainerState = IServiceDeleteInterfaceState;
