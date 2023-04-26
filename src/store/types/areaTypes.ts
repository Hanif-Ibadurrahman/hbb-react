import { IBusinessUnit } from "./businessUnitTypes";
import { PaginationState } from "./paginationTypes";
export interface IArea {
	id: string;
	id_bisnis_unit: string | null;
	id_emp: string | null;
	name: string | null;
	daerah: string | null;
	pemegang: string | null;
	from_opname: number | null;
	bisnis_unit: IBusinessUnit | null;
}
export interface IAreaPaginateResponse extends PaginationState {
	data: IArea[];
}
export interface IAreaGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	daerah?: string;
	pemegang?: string;
	bisnis_unit?: string;
}
export interface ICreateAreaRequest {
	name: string;
	daerah: string;
	pengelola: string;
	nipg?: string;
	pemegang?: string;
	id_bisnis_unit: string;
	id_company?: string;
}
export interface IUpdateAreaRequest {
	name: string;
	daerah: string;
	pengelola: string;
	nipg?: string;
	pemegang?: string;
	id_bisnis_unit: string;
	id_company: string;
}
export interface IAreaGetAllResponse {
	status: string;
	message: string;
	data: IAreaPaginateResponse | null;
}
export interface IAreaInterfaceState {
	getAllAreaWithPagination: IAreaPaginateResponse | null;
	title: string;
}

export type AreaContainerState = IAreaInterfaceState;
