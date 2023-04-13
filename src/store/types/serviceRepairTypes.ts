import { PaginationState } from "./paginationTypes";

export interface IServiceRepair {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceRepairPaginateResponse extends PaginationState {
	data: IServiceRepair[];
}

export interface IServiceRepairGetAllParams {
	page?: number;
	page_size?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceRepairRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IUpdateServiceRepairRequest {
	name_item: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	specification: string;
}

export interface IServiceRepairGetAllResponse {
	status: string;
	message: string;
	data: IServiceRepairPaginateResponse | null;
}

export interface IServiceRepairInterfaceState {
	getAllServiceRepairWithPagination: IServiceRepairPaginateResponse | null;
	title: string;
}

export type ServiceRepairContainerState = IServiceRepairInterfaceState;
