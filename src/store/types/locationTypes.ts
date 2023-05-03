import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";
export interface ILocation {
	id: number;
	id_bisnis_unit: number | null;
	id_area: number | null;
	id_pegawai: number | null;
	id_satker: number | null;
	id_company: number | null;
	name: string | null;
	from_opname: boolean | null;
	satker: IWorkUnit | null;
	employee: IEmployee | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
}

export interface ILocationPaginateResponse extends PaginationState {
	data: ILocation[];
}
export interface ILocationGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
}
export interface ICreateLocationRequest {
	id_bisnis_unit: string;
	id_area: string;
	id_pegawai: string;
	id_satker: string;
	name: string;
	from_opname: boolean | null;
}
export interface IUpdateLocationRequest {
	id_bisnis_unit: string;
	id_area: string;
	id_pegawai: string;
	id_satker: string;
	name: string;
	from_opname: boolean | null;
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
