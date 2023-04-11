import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";

export interface ILocation {
	id: string;
	id_bisnis_unit: string | null;
	id_area: string | null;
	id_pegawai: string | null;
	id_satker: string | null;
	name: string | null;
	from_opname: number | null;
	satker: IWorkUnit | null;
	employee: IEmployee | null;
}

export interface ILocationPaginateResponse extends PaginationState {
	data: ILocation[];
}

export interface ILocationGetAllParams {
	page?: number;
	page_size?: number;
	name?: string;
}

export interface ICreateLocationRequest {
	name: string;
}

export interface IUpdateLocationRequest {
	name: string;
}

export interface ILocationGetAllResponse {
	status: string;
	message: string;
	data: ILocationPaginateResponse | null;
}

export interface ILocationInterfaceState {
	getAllLocationWithPagination: ILocationPaginateResponse | null;
	title: string;
}

export type LocationContainerState = ILocationInterfaceState;
