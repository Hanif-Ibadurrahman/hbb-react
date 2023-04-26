import { PaginationState } from "./paginationTypes";

export interface IServiceReplacement {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceReplacementPaginateResponse extends PaginationState {
	data: IServiceReplacement[];
}

export interface IServiceReplacementGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceReplacementRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceReplacementRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceReplacementGetAllResponse {
	status: string;
	message: string;
	data: IServiceReplacementPaginateResponse | null;
}

export interface IServiceReplacementInterfaceState {
	getAllServiceReplacementWithPagination: IServiceReplacementPaginateResponse | null;
	title: string;
}

export type ServiceReplacementContainerState =
	IServiceReplacementInterfaceState;
