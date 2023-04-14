import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";

export interface IDivision {
	id: string;
	id_bisnis_unit: string | null;
	id_area: string | null;
	id_satker: string | null;
	name: string | null;
	bisnis_unit: IBusinessUnit | null;
	area: IArea | null;
	satker: IWorkUnit | null;
}

export interface IDivisionPaginateResponse extends PaginationState {
	data: IDivision[];
}

export interface IDivisionGetAllParams {
	page?: number;
	page_size?: number;
	name?: string;
}

export interface ICreateDivisionRequest {
	name: string;
	id_bisnis_unit: string;
	id_area: string;
	id_satker: string;
}

export interface IUpdateDivisionRequest {
	name: string;
	id_bisnis_unit: string;
	id_area: string;
	id_satker: string;
}

export interface IDivisionGetAllResponse {
	status: string;
	message: string;
	data: IDivisionPaginateResponse | null;
}

export interface IDivisionInterfaceState {
	getAllDivisionWithPagination: IDivisionPaginateResponse | null;
	title: string;
}

export type DivisionContainerState = IDivisionInterfaceState;
