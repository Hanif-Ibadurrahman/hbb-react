import { PaginationState } from "./paginationTypes";

export interface IServiceInspection {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceInspectionPaginateResponse extends PaginationState {
	data: IServiceInspection[];
}

export interface IServiceInspectionGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceInspectionRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceInspectionRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceInspectionGetAllResponse {
	status: string;
	message: string;
	data: IServiceInspectionPaginateResponse | null;
}

export interface IServiceInspectionInterfaceState {
	getAllServiceInspectionWithPagination: IServiceInspectionPaginateResponse | null;
	title: string;
}

export type ServiceInspectionContainerState = IServiceInspectionInterfaceState;
