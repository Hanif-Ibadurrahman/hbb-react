import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";

export interface ILocation {
	id: string;
	id_bisnis_unit: string;
	id_area: string;
	id_pegawai: string;
	id_satker: string;
	name: string;
	from_opname: number | null;
	satker: IWorkUnit;
	employee: IEmployee;
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
	countryList: ILocation[] | [];
	title: string;
}

export type LocationContainerState = ILocationInterfaceState;
