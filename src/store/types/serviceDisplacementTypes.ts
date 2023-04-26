import { PaginationState } from "./paginationTypes";

export interface IServiceDisplacement {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceDisplacementPaginateResponse extends PaginationState {
	data: IServiceDisplacement[];
}

export interface IServiceDisplacementGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceDisplacementRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceDisplacementRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceDisplacementGetAllResponse {
	status: string;
	message: string;
	data: IServiceDisplacementPaginateResponse | null;
}

export interface IServiceDisplacementInterfaceState {
	getAllServiceDisplacementWithPagination: IServiceDisplacementPaginateResponse | null;
	title: string;
}

export type ServiceDisplacementContainerState =
	IServiceDisplacementInterfaceState;
