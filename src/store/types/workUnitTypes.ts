import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";

export interface IWorkUnit {
	id: string;
	id_bisnis_unit: string | null;
	id_area: string | null;
	name: string | null;
	id_pegawai: string | null;
	from_opname: number | null;
	bisnis_unit: IBusinessUnit | null;
	area: IArea | null;
	employee?: IEmployee | null;
}

export interface IWorkUnitPaginateResponse extends PaginationState {
	data: IWorkUnit[];
}

export interface IWorkUnitGetAllParams {
	page?: number;
	page_size?: number;
	name?: string;
}

export interface ICreateWorkUnitRequest {
	name: string;
}

export interface IUpdateWorkUnitRequest {
	name: string;
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
