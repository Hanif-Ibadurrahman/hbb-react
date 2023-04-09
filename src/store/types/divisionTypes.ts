import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";

export interface IDivision {
	id: string;
	id_bisnis_unit: string;
	id_area: string;
	id_satker: string;
	name: string;
	bisnis_unit: IBusinessUnit;
	area: IArea;
	satker: IWorkUnit;
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
}

export interface IUpdateDivisionRequest {
	name: string;
}

export interface IDivisionGetAllResponse {
	status: string;
	message: string;
	data: IDivisionPaginateResponse | null;
}

export interface IDivisionInterfaceState {
	countryList: IDivision[] | [];
	title: string;
}

export type DivisionContainerState = IDivisionInterfaceState;
