import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { IEmployee } from "./employeeTypes";
import { PaginationState } from "./paginationTypes";

export interface IWorkUnit {
	id: string;
	id_bisnis_unit: string;
	id_area: string;
	name: string;
	id_pegawai: string;
	from_opname: number | null;
	bisnis_unit: IBusinessUnit;
	area: IArea;
	employee?: IEmployee;
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
	countryList: IWorkUnit[] | [];
	title: string;
}

export type WorkUnitContainerState = IWorkUnitInterfaceState;
