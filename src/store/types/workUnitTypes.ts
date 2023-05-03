import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";

export interface IWorkUnit {
	id: number;
	id_bisnis_unit: number | null;
	id_area: number | null;
	name: string | null;
	id_pegawai: number | null;
	from_opname: boolean | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	bisnis_unit: IBusinessUnit | null;
	area: IArea | null;
	employee?: IEmployee | null;
}
export interface IWorkUnitPaginateResponse extends PaginationState {
	data: IWorkUnit[];
}
export interface IWorkUnitGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	bisnis_unit?: string;
	area?: string;
	kepala_satker?: string;
}

export interface ICreateWorkUnitRequest {
	name: string;
	id_area: number;
	id_bisnis_unit: number;
	id_pegawai: number;
	id_company: number;
}

export interface IUpdateWorkUnitRequest {
	name: string;
	id_area: string;
	id_bisnis_unit: string;
	id_pegawai: string;
	id_company: number;
}

export interface IWorkUnitGetAllResponse {
	status: string;
	message: string;
	data: IWorkUnitPaginateResponse | null;
}

export interface IWorkUnitInterfaceState {
	getAllWorkUnitWithPagination: IWorkUnitPaginateResponse | null;
	title: string;
}

export type WorkUnitContainerState = IWorkUnitInterfaceState;
